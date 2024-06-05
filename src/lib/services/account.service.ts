import { IAccount } from "../models/interfaces/account.interface";
import { errorService } from "./error.service";

class AccountService {
  async findAll() {
    try {
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }

  async findById(accountId: number) {
    try {
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }

  async create(data: IAccount) {
    try {
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }

  async createMany(data: IAccount[]) {
    try {
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }
}

export const accountService = new AccountService();
