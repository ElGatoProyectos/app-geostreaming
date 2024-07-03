import { validateUpdateUser, validateUser } from "@/lib/validations/user";
import { UserInType, UserOutType, UserUpdateInType } from "@/types/user";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

interface UserModelType {
  getById: ({ user_id }: { user_id: number }) => Promise<any>;
  getAll: () => Promise<any[]>;
  create: ({ user_info }: { user_info: UserInType }) => Promise<UserOutType>;
  delete: ({ user_id }: { user_id: number }) => Promise<any>;
  update: ({
    user_id,
    user_info,
  }: {
    user_id: number;
    user_info: UserUpdateInType;
  }) => Promise<any>;
  getAllByRole: (userRole: "USER" | "DISTRIBUTOR") => Promise<any[]>;
}

export class UserService {
  private userModel: UserModelType;
  constructor({ userModel }: { userModel: UserModelType }) {
    this.userModel = userModel;
  }

  getById = async ({ params }: { params: { id: string } }) => {
    try {
      const user_id = Number(params.id);

      const exactUser = await this.userModel.getById({
        user_id,
      });

      return exactUser;
    } catch (e) {
      throw new Error("User not found");
    }
  };

  getAll = async () => {
    try {
      const users = await this.userModel.getAll();
      return users;
    } catch (e) {
      throw new Error("Users not found");
    }
  };

  getAllByRole = async (userRole: "USER" | "DISTRIBUTOR") => {
    try {
      const users = await this.userModel.getAllByRole(userRole);
      return users;
    } catch (e) {
      throw new Error(`User with role ${userRole} not found}`);
    }
  };

  create = async ({ req }: { req: NextRequest }) => {
    const user_info = await req.json();

    const hashedPassword = bcrypt.hashSync(user_info.password, 10);
  
    const userValidated = validateUser({
      ...user_info,
      password: hashedPassword,
      
    });
  
    try {
      const newUser = await this.userModel.create({ user_info: userValidated });
      const { password, ...user } = newUser;
      return user;
    } catch (e) {
      throw new Error("User not created");
    }
  };

  delete = async ({ params: { id } }: { params: { id: string } }) => {
    try {
      await this.userModel.delete({
        user_id: Number(id),
      });
    } catch (e) {
      throw new Error("User not deleted");
    }
  };

  update = async ({
    req,
    params,
  }: {
    params: { id: string };
    req: NextRequest;
  }) => {
    const user_info = await req.json();
    const { id } = params;

    const userValidated = validateUpdateUser(user_info) as any;

    try {
      const userUpdated = await this.userModel.update({
        user_id: Number(id),
        user_info: userValidated,
      });
      return userUpdated;
    } catch (e) {
      throw new Error("Product not update");
    }
  };
}
