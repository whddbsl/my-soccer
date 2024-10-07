import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '허용되지 않는 메소드입니다' });
  }

  try {
    console.log('받은 요청 본문:', req.body);

    const user = await verifyToken(req);
    if (!user) {
      return res.status(401).json({ message: '인증되지 않은 사용자입니다' });
    }

    const { voteId, choice } = req.body;

    if (!voteId || !choice) {
      return res.status(400).json({ message: '투표 ID와 선택 사항은 필수입니다' });
    }

    const client = await clientPromise;
    const db = client.db("soccer_team_db");

    // 투표 정보 조회
    const vote = await db.collection("votes").findOne({ _id: new ObjectId(voteId) });

    if (!vote) {
      return res.status(404).json({ message: '해당 투표를 찾을 수 없습니다' });
    }

    console.log('조회된 투표 정보:', vote);

    // attendees와 absentees가 없으면 빈 배열로 초기화
    vote.attendees = vote.attendees || [];
    vote.absentees = vote.absentees || [];

    // 이미 투표한 경우 처리
    const alreadyVoted = vote.attendees.includes(user.userId) || vote.absentees.includes(user.userId);
    if (alreadyVoted) {
      return res.status(400).json({ message: '이미 투표하셨습니다' });
    }

    // 투표 업데이트
    let updateField = choice === '참석' ? 'attendees' : 'absentees';
    let removeField = choice === '참석' ? 'absentees' : 'attendees';

    const result = await db.collection("votes").updateOne(
      { _id: new ObjectId(voteId) },
      { 
        $addToSet: { [updateField]: user.userId },
        $pull: { [removeField]: user.userId }
      }
    );

    console.log('투표 업데이트 결과:', result);

    res.status(200).json({ message: '투표가 성공적으로 처리되었습니다' });
  } catch (error) {
    console.error('투표 처리 중 오류 발생:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다', error: error.message });
  }
}
