import { errorService } from "./error.service";

class WhatsAppService {
  async sendMessage(phoneReceptor: string, message: string) {
    try {
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }
}

export const whatsAppService = new WhatsAppService();
