// --- app/api/auth/route.ts ---
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = 'your-secret-key';

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const token = cookie.split(';').find(c => c.trim().startsWith("token="))?.split("=")[1];

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    jwt.verify(token, SECRET_KEY);
    return NextResponse.json({ message: "Authorized" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}