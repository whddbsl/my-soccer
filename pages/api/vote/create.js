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

    const { teamId, title, date, time, location } = req.body;

    const client = await clientPromise;
    const db = client.db("soccer_team_db");

    const newVote = {
      title,
      date,
      time,
      location,
      teamId: new ObjectId(teamId),
      createdBy: user.userId,
      attendees: [],  // 빈 배열로 초기화
      absentees: []   // 빈 배열로 초기화
    };

    const result = await db.collection("votes").insertOne(newVote);

    res.status(201).json({ message: '투표가 생성되었습니다', voteId: result.insertedId });
  } catch (error) {
    console.error('투표 생성 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다' });
  }
}
