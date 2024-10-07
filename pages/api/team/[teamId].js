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
    console.log('Requested teamId:', teamId);

    if (!teamId || typeof teamId !== 'string') {
      return res.status(400).json({ message: '유효하지 않은 팀 ID입니다' });
    }

    const client = await clientPromise;
    const db = client.db("soccer_team_db");

    let team;
    try {
      team = await db.collection("teams").findOne({ _id: new ObjectId(teamId) });
    } catch (error) {
      console.error('팀 조회 오류:', error);
      return res.status(400).json({ message: '유효하지 않은 팀 ID 형식입니다' });
    }

    console.log('Found team:', team);

    if (!team) {
      return res.status(404).json({ message: '팀을 찾을 수 없습니다' });
    }

    const teamMembers = await db.collection("team_members").find({ teamId: new ObjectId(teamId) }).toArray();

    const sanitizedMembers = teamMembers.map(member => ({
      userId: member.userId.toString(),
      name: member.name,
      position: member.position || '',
      role: member.role
    }));

    // 감독 정보 찾기
    const manager = sanitizedMembers.find(member => member.role === '감독');

    let userRole = null;
    if (team.members && Array.isArray(team.members)) {
      const userMember = team.members.find(member => member.userId.toString() === user.userId);
      userRole = userMember ? userMember.role : null;
    } else {
      console.warn('팀에 members 배열이 없거나 유효하지 않습니다.');
    }

    console.log('User:', user);
    console.log('User role:', userRole);

    res.status(200).json({
      ...team,
      members: sanitizedMembers,
      manager: manager || null,  // 감독 정보를 별도로 포함
      userRole
    });
  } catch (error) {
    console.error('팀 정보 조회 오류:', error);
    console.error('오류 세부 정보:', error.stack);
    res.status(500).json({ message: '서버 오류가 발생했습니다', error: error.message });
  }
}
