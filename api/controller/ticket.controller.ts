import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { ticketRepository } from "../../DB/repositories/ticket.repositorie";
import { AppError } from "../../shared/datastructures/AppError";
import { ITicket, TicketResponse } from "../types/ticket/TicketRequest";
import { APITerminal } from "../utility/APITerminal";

export const createTicket = async (req: ITicket, res: Response) => {
  const { title, description, status, user } = req.body;
  const ticketRepo = ticketRepository.getInstance();
  if (!title) throw new AppError(400, "please insert the title");
  if (!description) throw new AppError(400, "please insert description");
  const response = await ticketRepo.create(title, description, user, status);

  APITerminal.respondWithSuccess<TicketResponse>(res, response, 201);
};

export const updateTicket = async (req: Request, res: Response) => {
  const TicketId = req.params.id;
  console.log(TicketId);
  const reqBody = req.body;
  const ticketRepo = ticketRepository.getInstance();
  const ticket = await ticketRepo.update(TicketId, reqBody);

  APITerminal.respondWithSuccess(res, ticket, 200);
};

export const getAllTicket = async (req: Request, res: Response) => {
  const ticketRepo = ticketRepository.getInstance();
  const getTicket = await ticketRepo.find();

  APITerminal.respondWithSuccess(res, getTicket, 200);
};
