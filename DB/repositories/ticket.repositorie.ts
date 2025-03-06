import { Ticket } from "../models/ticket.model";
import { ObjectId } from "mongoose";
import { ITicket, TicketResponse } from "../../api/types/ticket/TicketRequest";

export class ticketRepository {
  static repo: ticketRepository | null = null;

  private constructor() {}

  static getInstance() {
    if (!ticketRepository.repo) {
      ticketRepository.repo = new ticketRepository();
    }

    return ticketRepository.repo;
  }

  async find(): Promise<TicketResponse[]> {
    const tickets = await Ticket.find();
    return tickets;
  }

  async create(
    title: string,
    description: string,
    user: string,
    status: string
  ) {
    const ticket = new Ticket({
      title: title,
      description: description,
      user: user,
      status: status,
    });
    const newTicket = await Ticket.create(ticket);
    return newTicket;
  }

  async update(id: string, body: ITicket) {
    const getTicket = await Ticket.findOne({ id });
    console.log(getTicket);
    // if (!getTicket) throw new AppError(400, "Ticket not found in this id");
    // const updatedTicket = await Ticket.findOneAndUpdate({ id: id }, body, {
    //   new: true,
    // });

    console.log(body);
    const updatedTicket = await Ticket.findOneAndUpdate({ id: id }, body, {
      new: true,
    });
    console.log(updatedTicket);
    return updatedTicket;
  }
}
