import { jwtDecode } from "jwt-decode";

type JtwPayload = {
  userId: string;
  username: string;
  rol: string;
  exp: number;
};

export const decodeToken = (token: string): JtwPayload => {
  return jwtDecode<JtwPayload>(token);
};
