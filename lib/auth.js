import jwt from 'jsonwebtoken';
import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';

export async function verifyToken(req) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 사용자 정보에서 이름을 포함하여 반환
    const user = await getUserInfo(decoded.userId);
    return user ? { ...decoded, name: user.name } : null;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

async function getUserInfo(userId) {
  try {
    const client = await clientPromise;
    const db = client.db("soccer_team_db");
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });
    return user;
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
}
