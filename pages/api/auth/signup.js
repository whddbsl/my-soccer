import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "허용되지 않는 메소드입니다" });
  }

  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "모든 필드를 입력해주세요" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("soccer_team_db");

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "이미 존재하는 이메일입니다" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
    });

    res
      .status(201)
      .json({
        message: "회원가입이 완료되었습니다",
        userId: result.insertedId,
      });
  } catch (error) {
    console.error("회원가입 오류:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다" });
  }
}
