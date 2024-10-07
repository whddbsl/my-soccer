import clientPromise from '../../../lib/mongodb';
import { verifyToken } from '../../../lib/auth';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: '허용되지 않는 메소드입니다' });
  }

  try {
    const user = await verifyToken(req);
    if (!user) {
      return res.status(401).json({ message: '인증되지 않은 사용자입니다' });
    }

    const { teamId } = req.body;

    const client = await clientPromise;
    const db = client.db("soccer_team_db");

    // 사용자가 해당 팀의 감독인지 확인
    const teamMember = await db.collection("team_members").findOne({
      teamId: new ObjectId(teamId),
      userId: new ObjectId(user.userId),
      role: '감독'
    });

    if (!teamMember) {
      return res.status(403).json({ message: '팀을 삭제할 권한이 없습니다' });
    }

    // 팀 삭제
    await db.collection("teams").deleteOne({ _id: new ObjectId(teamId) });

    // 팀 멤버 삭제
    await db.collection("team_members").deleteMany({ teamId: new ObjectId(teamId) });

    res.status(200).json({ message: '팀이 성공적으로 삭제되었습니다' });
  } catch (error) {
    console.error('팀 삭제 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다' });
  }
}
