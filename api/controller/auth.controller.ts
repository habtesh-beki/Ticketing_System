import { Response } from "express";
import { LoginRequest } from "../types/user/UserRequest";
import { AppError } from "../../shared/datastructures/AppError";
import { UserRepository } from "../../DB/repositories/user.repository";
import { AuthServiceProvider } from "../../services/auth/auth.service";
import { HashingServiceProvider } from "../../services/hash/hash.service";

export const login = async (req: LoginRequest, res: Response) => {
  const { email, password } = req.body;

  if (!email) throw new AppError(402, "Email is required to login.");
  if (!password) throw new AppError(402, "Password is required to login.");

  const userRepo = UserRepository.getInstance();

  const user = await userRepo.findByEmail(email);

  if (!user) throw new AppError(402, "invalid Email or password.");

  const isPasswordCorrect = await HashingServiceProvider.getProvider().verify(
    password,
    user.password
  );

  if (!isPasswordCorrect) throw new AppError(402, "invalid Email or password.");

  const token = AuthServiceProvider.getProvider().signAuthentication(user._id);

  res.status(200).json({
    token: token.token,
  });
};
