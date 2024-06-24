import { UserModel } from "@/models/mysql/user-model";
import { UserService } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";
const userService = new UserService({ userModel: UserModel });

// export async function POST(request: NextRequest) {
//   try {
//     const data = await request.json();

//     const userFound = prisma.user.findUnique({
//       where: { email: data.email },
//     });

//     if (userFound) {
//       return NextResponse.json(
//         { message: "User already exists" },
//         { status: 400 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(data.password, 10);

//     const newUser = prisma.user.create({
//       data: {
//         email: data.email,
//         password: hashedPassword,
//       },
//     });

//     const { password, ...user } = newUser;

//     return NextResponse.json(user);
//   } catch (e: any) {
//     return NextResponse.json({ message: e.message }, { status: 500 });
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const newUser = await userService.create({ req });
    return NextResponse.json(newUser);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to Create user" },
      { status: 500 }
    );
  }
}
