import clientPromise from '../../../lib/mongodb';
import { verifyToken } from '../../../lib/auth';
import { ObjectId } from 'mongodb';

function generateTeamCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '허용되지 않는 메소드입니다' });
  }

  try {
    const user = await verifyToken(req);
    if (!user) {
      return res.status(401).json({ message: '인증되지 않은 사용자입니다' });
    }

    const { teamName, position } = req.body;

    const client = await clientPromise;
    const db = client.db("soccer_team_db");

    // 팀 코드 생성
    let teamCode;
    let existingTeam;
    do {
      teamCode = generateTeamCode();
      existingTeam = await db.collection("teams").findOne({ teamCode });
    } while (existingTeam);

    // 새 팀 생성
    const result = await db.collection("teams").insertOne({
      teamName,
      teamCode,
      createdAt: new Date(),
      createdBy: new ObjectId(user.userId)
    });

    // 팀 생성자를 팀 멤버로 추가
    await db.collection("team_members").insertOne({
      userId: new ObjectId(user.userId),
      teamId: result.insertedId,
      name: user.name,  // 로그인할 때 사용한 이름
      position,
      role: '감독',  // 팀 생성자는 감독 역할
      joinedAt: new Date()
    });

    res.status(201).json({ 
      message: '팀이 성공적으로 생성되었습니다',
      teamCode,
      teamId: result.insertedId
    });
  } catch (error) {
    console.error('팀 생성 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다' });
  }
}
