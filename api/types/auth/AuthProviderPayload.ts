import { JwtPayload } from "jsonwebtoken";

export type AuthProviderSignReturn = {
  token: string;
};

export interface AppJWTPayload extends JwtPayload {
  id: string;
}

export interface AuthPayload {
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  password: string;
  id: string;
}

export interface AuthLogin {
  token: string;
}
