import prisma from "../prisma";
import { errorService } from "./error.service";
import { httpResponse } from "./http.service";
import bcrypt from "bcrypt";

class SeedService {
  async excuteSeed() {
    try {
      const admin = {
        full_name: "Antonio Hialgo",
        phone: "999999999",
        email: "antonio@gmail.com",
        username: "antonio",
      };

      return await this.createAdmin(admin);
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }

  async createAdmin(data: {
    full_name: string;
    email: string;
    phone: string;
    username: string;
  }) {
    try {
      const password = bcrypt.hashSync(data.username, 11);
      const setData = { ...data, password };
      const created = await prisma.admin.create({ data: setData });
      return httpResponse.http201("Admin created", created);
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }

  async createUsers() {
    try {
    } catch (error) {
      errorService.handleErrorSchema(error);
    }
  }
}

export const seedService = new SeedService();
