import { NextFunction, Response } from "express";
import { AuthServiceProvider } from "../../services/auth/auth.service";
import { userReq } from "../types/user/UserRequest";
import { User } from "../../DB/models/user.model";

export const authenticateJWT = async (
  req: userReq,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(403).json({ message: "Access denied. No token provided." });
    return;
  }
  const decoded = AuthServiceProvider.authService?.authenticate(token);
  console.log(decoded);
  if (!decoded) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  try {
    const Id = decoded;
    const user = await User.findOne({ _id: Id });
    console.log(user);
    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({
      message: "Error fetching student data",
    });
  }
};

export const authorizeAdmin = (
  req: userReq,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "admin") {
    return next();
  } else {
    res.status(403).json({
      message: "You are not authorized to do this action",
    });
    return;
  }
};
