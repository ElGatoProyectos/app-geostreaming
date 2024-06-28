import prisma from "@/lib/prisma";
import { validateRenovateUpdateAccount } from "@/lib/validations/account";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  let account_id;
  let accountInfo;
  let accountvalidated;

  try {
    account_id = Number(params.id);
    if (isNaN(account_id)) {
      return NextResponse.json({ error: "Invalid bank ID" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing bank ID" },
      { status: 400 }
    );
  }

  try {
    accountInfo = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    accountvalidated = validateRenovateUpdateAccount(accountInfo);
  } catch (error) {
    return NextResponse.json({ error: "Validation error" }, { status: 400 });
  }

  try {
    const updatedBank = await prisma.account.update({
      where: { id: account_id },
      data: accountvalidated,
    });

    return NextResponse.json(updatedBank);
  } catch (error) {
    return NextResponse.json({ error: "Error updating bank" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
