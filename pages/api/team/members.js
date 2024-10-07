import clientPromise from '../../../lib/mongodb';
import { verifyToken } from '../../../lib/auth';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  console.log('API 호출: /api/team/members');
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

    console.log('사용자 ID:', user.userId);
    
    // userId를 문자열로 비교
    const teamMember = await db.collection("team_members").findOne({ userId: user.userId });
    console.log('팀 멤버 정보:', teamMember);

    if (!teamMember) {
      console.log('팀 멤버를 찾을 수 없습니다.');
      return res.status(404).json({ message: '가입한 팀이 없습니다' });
    }

    const teamMembers = await db.collection("team_members")
      .find({ teamId: teamMember.teamId })
      .toArray();

    console.log('팀원 수:', teamMembers.length);

    const sanitizedMembers = teamMembers.map(member => ({
      name: member.name,
      position: member.preferredPosition,
      joinedAt: member.joinedAt
    }));

    res.status(200).json(sanitizedMembers);
  } catch (error) {
    console.error('팀원 목록 조회 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다' });
  }
}
