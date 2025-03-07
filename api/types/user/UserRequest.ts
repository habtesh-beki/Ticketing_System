import { Request } from "express";

export interface UserByIdRequest extends Request {
  params: {
    id: string;
  };
}

export interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface userReq extends Request {
  user?: {
    first_name: string;
    last_name: string;
    role: string;
    email: string;
    password: string;
  };
}

export interface SignupRequest extends Request {
  body: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
  };
}
