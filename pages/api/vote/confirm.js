import clientPromise from '../../../lib/mongodb';
import { verifyToken } from '../../../lib/auth';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '허용되지 않는 메소드입니다' });
  }

  try {
    const user = await verifyToken(req);
    if (!user) {
      return res.status(401).json({ message: '인증되지 않은 사용자입니다' });
    }

    const { voteId, teamId } = req.body;

    console.log('User:', user);
    console.log('VoteId:', voteId);
    console.log('TeamId:', teamId);

    const client = await clientPromise;
    const db = client.db("soccer_team_db");

    // 사용자가 해당 팀의 감독인지 확인
    const team = await db.collection("teams").findOne({
      _id: new ObjectId(teamId),
      "members.userId": new ObjectId(user.userId),
      "members.role": '감독'
    });

    console.log('Team:', team);

    if (!team) {
      return res.status(403).json({ message: '매칭을 확정할 권한이 없습니다' });
    }

    // 투표 상태 업데이트
    const result = await db.collection("votes").updateOne(
      { _id: new ObjectId(voteId) },
      { $set: { isConfirmed: true } }
    );

    console.log('Update result:', result);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: '투표를 찾을 수 없거나 이미 확정되었습니다' });
    }

    res.status(200).json({ message: '매칭이 확정되었습니다' });
  } catch (error) {
    console.error('매칭 확정 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다' });
  }
}
