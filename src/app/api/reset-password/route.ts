import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth-options";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt"

export async function POST(req: NextRequest) {
    let session;
    let newAdmin;

    try {
        session = await getServerSession(authOptions);
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching session" },
            { status: 500 }
        );
    }
    const { password, newPassword } = await req.json();
    console.log(newPassword);
    console.log(password);
    try {
        if (session.user.role === "ADMIN") {

            const admin = await prisma.admin.findFirst({ where: { id: Number(session.user.id) } })
            console.log(admin);
            if (!admin) return NextResponse.json(
                { error: "Error fetch admin" },
                { status: 400 }
            );
            
            const responseCompare = bcrypt.compareSync(password, admin.password)
            if (responseCompare) {
                await prisma.admin.update({ where: { id: Number(session.user.id) }, data: { password: bcrypt.hashSync(newPassword, 10) } })
            }else{
                 return NextResponse.json(
                { error: "Error password" },
                { status: 400 }
            );
            }
        } else if (session.user.role === "USER" || session.user.role === "DISTRIBUTOR") {
            const user = await prisma.user.findFirst({ where: { id: Number(session.user.id) } })
            if (!user) return NextResponse.json(
                { error: "Error fetch user" },
                { status: 400 }
            );
            const responseCompare = bcrypt.compareSync(password, user.password)
            if (responseCompare) {
                await prisma.user.update({ where: { id: Number(session.user.id) }, data: { password: bcrypt.hashSync(newPassword, 10) } })
            }else{
                return NextResponse.json(
               { error: "Error password" },
               { status: 400 }
           );
           }
            
        }
        return NextResponse.json(
            { message: "update auth" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(

            { error: "Error in update" },
            { status: 500 }
        );
    }


}