import prisma from "../prisma";
import { errorService } from "./error.service";
import { httpResponse } from "./http.service";

class UserService {
  async findUsers() {}

  async findByUsername(username: string) {
    try {
      const user = await prisma.user.findFirst({ where: { username } });
      if (!user) return httpResponse.http404("User not found");
      return httpResponse.http200("User found", user);
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }

  async findUserByRole(role: string) {
    try {
    } catch (error) {}
  }
}

export const userService = new UserService();
