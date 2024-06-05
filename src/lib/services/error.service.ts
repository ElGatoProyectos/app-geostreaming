import { ZodError } from "zod";
import { httpResponse } from "./http.service";

class ErrorService {
  handleErrorSchema(error: any, service?: string) {
    if (error instanceof ZodError) {
      const validationErrors = error.errors;
      return httpResponse.http400(
        "Error in validation schema",
        validationErrors
      );
    } else {
      const errorMessage = `Error in ${service ? service : "Server"}`;
      return httpResponse.http500(errorMessage, error);
    }
  }
}

export const errorService = new ErrorService();
