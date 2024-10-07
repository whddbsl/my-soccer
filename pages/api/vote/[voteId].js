import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: '허용되지 않는 메소드입니다' });
  }

  try {
    console.log('투표 상세 정보 요청 받음:', req.query);

    const user = await verifyToken(req);
    if (!user) {
      return res.status(401).json({ message: '인증되지 않은 사용자입니다' });
    }

    const { voteId } = req.query;
    console.log('조회할 투표 ID:', voteId);

    const client = await clientPromise;
    const db = client.db("soccer_team_db");

    const vote = await db.collection("votes").findOne({ _id: new ObjectId(voteId) });
    console.log('조회된 투표 정보:', vote);

    if (!vote) {
      return res.status(404).json({ message: '해당 투표를 찾을 수 없습니다' });
    }

    // 참석자와 불참석자의 상세 정보 조회
    const attendees = await db.collection("users").find({ _id: { $in: vote.attendees?.map(id => new ObjectId(id)) || [] } }).toArray();
    const absentees = await db.collection("users").find({ _id: { $in: vote.absentees?.map(id => new ObjectId(id)) || [] } }).toArray();

    console.log('참석자 수:', attendees.length);
    console.log('불참석자 수:', absentees.length);

    const result = {
      ...vote,
      attendees: attendees.map(user => ({ userId: user._id.toString(), name: user.name })),
      absentees: absentees.map(user => ({ userId: user._id.toString(), name: user.name }))
    };

    console.log('응답 데이터:', result);

    res.status(200).json(result);
  } catch (error) {
    console.error('투표 상세 정보 조회 중 오류 발생:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다', error: error.message });
  }
}
