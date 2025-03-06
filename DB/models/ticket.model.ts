import mongoose, { model, Model } from "mongoose";
import { User } from "./user.model";
import { v4 as uuidv4 } from "uuid";

const { Schema } = mongoose;

const ticketSchema = new Schema({
  id: {
    type: String,
    default: () => uuidv4(),
  },
  title: {
    type: String,
    required: true,
    minlength: 10,
    // maxlength: 20,
  },
  description: {
    type: String,
    required: true,
    minlength: 20,
    // maxlength: 45,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["open", "In Progress", "Closed"],
    default: "open",
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export { Ticket };
