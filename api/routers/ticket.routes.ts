import { Router } from "express";
import { catchControllerError } from "../utility/catchControllerErrors";
import {
  createTicket,
  getAllTicket,
  updateTicket,
} from "../controller/ticket.controller";
import { authenticateJWT, authorizeAdmin } from "../middlewares/middleware";

const router = Router();

router
  .route("/tickets")
  .post(authenticateJWT, catchControllerError(createTicket))
  .get(catchControllerError(getAllTicket));
router
  .route("/tickets/:id")
  .put(authorizeAdmin, catchControllerError(updateTicket));

export { router as ticketRoute };
