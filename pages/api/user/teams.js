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

    // 사용자가 속한 모든 팀의 정보를 가져옵니다
    const teamMembers = await db.collection("team_members")
      .find({ userId: new ObjectId(user.userId) })
      .toArray();

    // 팀 ID 목록을 생성합니다
    const teamIds = teamMembers.map(member => member.teamId);

    // 팀 정보를 가져옵니다
    const teams = await db.collection("teams")
      .find({ _id: { $in: teamIds } })
      .toArray();

    // 팀 정보에 사용자의 가입 날짜를 추가합니다
    const teamsWithJoinDate = teams.map(team => {
      const memberInfo = teamMembers.find(member => member.teamId.equals(team._id));
      return {
        teamId: team._id,
        teamName: team.teamName,
        teamCode: team.teamCode,
        joinedAt: memberInfo.joinedAt
      };
    });

    res.status(200).json(teamsWithJoinDate);
  } catch (error) {
    console.error('사용자 팀 정보 조회 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다' });
  }
}
