import { authDTO } from "../models/dto/auth.dto";
import { EUserRole } from "../models/enums/user.enum";
import { IAuth } from "../models/interfaces/auth.interface";

import { errorService } from "./error.service";
import bcrypt from "bcrypt";
import { userService } from "./user.service";
import { httpResponse } from "./http.service";
import { IHttpResponse } from "../models/interfaces/response.interface";
import prisma from "../prisma";

class AuthService {
  async login(data: IAuth, role: string): Promise<IHttpResponse> {
    try {
      authDTO.parse(data);

      if (role === "admin") {
        const admin = await prisma.admin.findFirst({
          where: { username: data.username },
        });
        if (!admin) return httpResponse.http401("Error in authentication");
        return httpResponse.http200("Auth success!", {
          id: admin.id,
          full_name: admin.full_name,
          role: "admin",
        });
      } else {
        const responseUser = await userService.findByUsername(role);
        if (!responseUser.ok)
          return httpResponse.http401("Error in authentication");

        if (bcrypt.compareSync(responseUser.content.password, data.password)) {
          return httpResponse.http200("Auth success!", {
            id: responseUser.content.id,
            full_name: responseUser.content.full_name,
            role: responseUser.content.role,
          });
        }
        return httpResponse.http401("Error in authentication");
      }
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }
}

export const authService = new AuthService();
