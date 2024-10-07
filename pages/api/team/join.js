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

    const { teamCode, name, position } = req.body;

    const client = await clientPromise;
    const db = client.db("soccer_team_db");

    // 팀 코드로 팀 찾기
    const team = await db.collection("teams").findOne({ teamCode });
    if (!team) {
      return res.status(404).json({ message: '팀을 찾을 수 없습니다' });
    }

    // 이미 해당 팀에 가입되어 있는지 확인
    const existingMember = await db.collection("team_members").findOne({
      userId: new ObjectId(user.userId),
      teamId: team._id
    });

    if (existingMember) {
      return res.status(400).json({ message: '이미 이 팀에 가입되어 있습니다' });
    }

    // 팀 멤버 추가 (역할은 '선수'로 설정)
    await db.collection("team_members").insertOne({
      userId: new ObjectId(user.userId),
      teamId: team._id,
      name,
      position,
      role: '선수',
      joinedAt: new Date()
    });

    res.status(200).json({ message: '팀 가입이 완료되었습니다' });
  } catch (error) {
    console.error('팀 가입 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다' });
  }
}
