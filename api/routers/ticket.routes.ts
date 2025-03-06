import { Router } from "express";
import { catchControllerError } from "../utility/catchControllerErrors";
import {
  createTicket,
  getAllTicket,
  updateTicket,
} from "../controller/ticket.controller";
import { authenticateJWT } from "../middlewares/middleware";

const router = Router();

router
  .route("/tickets")
  .post(authenticateJWT, catchControllerError(createTicket))
  .get(catchControllerError(getAllTicket));
router.route("/tickets/:id").put(catchControllerError(updateTicket));

export { router as ticketRoute };
