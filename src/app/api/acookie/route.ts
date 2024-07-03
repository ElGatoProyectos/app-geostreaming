import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth-options";
import { dev } from "@/context/token";

export async function GET(req: NextRequest) {
  let session;

  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching session" },
      { status: 500 }
    );
  }

  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  let cookiesesion = dev
    ? "next-auth.session-token"
    : "__Secure-next-auth.session-token";
  const token = req.cookies.get(cookiesesion)?.value as any;

  return NextResponse.json({ token });
}
