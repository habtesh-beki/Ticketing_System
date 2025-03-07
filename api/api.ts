import express from "express";
import cors from "cors";
import { ENV } from "../shared/utils/env";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRoute } from "./routers/user.routes";
import { ticketRoute } from "./routers/ticket.routes";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
const DB = ENV.dbConnection ?? " ";

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connectd");
  })
  .catch((err) => {
    console.log("DB connection error", err);
  });
app.use("/api/v1", userRoute);
app.use("/api/v1", ticketRoute);
export { app };
