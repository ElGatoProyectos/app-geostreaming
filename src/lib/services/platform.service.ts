import { IPlatform } from "../models/interfaces/platform.interface";
import { errorService } from "./error.service";

class PlatformService {
  async findAll() {
    try {
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }

  async create(data: IPlatform) {
    try {
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }

  async update(data: IPlatform, platformId: number) {
    try {
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }

  async changeStatus(status: string) {
    try {
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }
}

export const platformService = new PlatformService();
