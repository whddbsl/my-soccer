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

    const { voteId, participate } = req.body;

    const client = await clientPromise;
    const db = client.db("soccer_team_db");

    const vote = await db.collection("votes").findOne({ _id: new ObjectId(voteId) });
    if (!vote) {
      return res.status(404).json({ message: '투표를 찾을 수 없습니다' });
    }

    const updateField = participate ? 'participants' : 'nonParticipants';
    const otherField = participate ? 'nonParticipants' : 'participants';

    await db.collection("votes").updateOne(
      { _id: new ObjectId(voteId) },
      { 
        $addToSet: { [updateField]: new ObjectId(user.userId) },
        $pull: { [otherField]: new ObjectId(user.userId) }
      }
    );

    res.status(200).json({ message: '투표에 참여했습니다' });
  } catch (error) {
    console.error('투표 참여 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다' });
  }
}
