import { Request, Response } from "express";

import { APITerminal } from "../utility/APITerminal";
import { AppError } from "../../shared/datastructures/AppError";
import { SignupRequest, UserByIdRequest } from "../types/user/UserRequest";
import { UserRepository } from "../../DB/repositories/user.repository";
import { AuthPayload } from "../types/auth/AuthProviderPayload";

export const findUser = (req: Request, res: Response) => {
  APITerminal.respondWithSuccess<string>(res, "hello", 200);
};

export const findUserById = (req: UserByIdRequest, res: Response) => {
  if (!req.params.id) throw new AppError(402, "Could not identify user.");
  const userId = req.params.id;
  APITerminal.respondWithSuccess(res, userId, 200);
};

export const signup = async (req: SignupRequest, res: Response) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name) throw new AppError(402, "First Name is required to login.");
  if (!last_name) throw new AppError(402, "Last Name is required to login.");
  if (!email) throw new AppError(402, "email is required to login.");
  if (!password) throw new AppError(402, "Password is required to login.");

  const userRepo = UserRepository.getInstance();

  const checkUser = await userRepo.findByEmail(email);

  if (checkUser)
    throw new AppError(
      400,
      "Another user has already registerd with that email."
    );
  const user = await userRepo.create(first_name, last_name, email, password);

  APITerminal.respondWithSuccess<AuthPayload>(
    res,
    {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,

      role: user.role,
      id: user.id,
    },
    200
  );
};
