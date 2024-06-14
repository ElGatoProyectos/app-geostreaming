import { authService } from "@/lib/services/auth.service";

export async function authenticate(data: {
  username: string;
  password: string;
  role: string;
}) {
  const response = await authService.login(
    { username: data.username, password: data.password },
    data.role
  );
  if (response.ok) {
    const user = {
      id: response.content.id,
      role: response.content.role,
      username: response.content.username,
    };

    return user;
  } else {
    return null;
  }
}
