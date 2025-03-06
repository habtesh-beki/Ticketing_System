import { Request } from "express";
import { ObjectId } from "mongoose";
export interface TicketByIdRequest extends Request {
  params: {
    id: string;
  };
}

export interface CreateTicketRequest extends Request {
  body: {
    title: string;
    body: string;
    status: string;
  };
}

export interface TicketResponse {
  title: string;
  description: string;
  status: string;
  id: string;
}

export interface ITicket extends Request {
  title: string;
  decription: string;
  status: string;
}

// export interface Idecoded extends Request {

//     _id: ObjectId,
//     first_name: string,
//     last_name: string,
//     password: string,
//     email:string,
//     role: string,
//     id: string,

// }
