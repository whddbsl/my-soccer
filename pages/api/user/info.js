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

    const client = await clientPromise;
    const db = client.db("soccer_team_db");

    const userInfo = await db.collection("users").findOne(
      { _id: new ObjectId(user.userId) },
      { projection: { password: 0 } } // 비밀번호 필드 제외
    );

    if (!userInfo) {
      return res.status(404).json({ message: '사용자 정보를 찾을 수 없습니다' });
    }

    res.status(200).json(userInfo);
  } catch (error) {
    console.error('사용자 정보 조회 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다' });
  }
}
