import clientPromise from '../../../lib/mongodb';
import { verifyToken } from '../../../lib/auth';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: '허용되지 않는 메소드입니다' });
  }

  try {
    const user = await verifyToken(req);
    if (!user) {
      return res.status(401).json({ message: '인증되지 않은 사용자입니다' });
    }

    const { teamId } = req.query;

    const client = await clientPromise;
    const db = client.db("soccer_team_db");

    const matches = await db.collection("votes")
      .aggregate([
        { 
          $match: { 
            teamId: new ObjectId(teamId),
            isConfirmed: true,
            date: { $gte: new Date().toISOString().split('T')[0] }  // 오늘 이후의 매치만
          } 
        },
        { $sort: { date: 1, time: 1 } },
        {
          $lookup: {
            from: "team_members",
            localField: "participants",
            foreignField: "userId",
            as: "participantDetails"
          }
        }
      ])
      .toArray();

    res.status(200).json(matches);
  } catch (error) {
    console.error('매칭 목록 조회 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다' });
  }
}
