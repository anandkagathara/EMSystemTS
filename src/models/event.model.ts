import { Schema, model, Document } from "mongoose";
import { UserDocument } from "./user.model";

export interface EventDocument extends Document {
  title: string;
  description: string;
  eventDate: Date;
  eventTime: string;
  place: string;
  participants: UserDocument[];
  maxParticipants: number;
  creator: UserDocument;
}

const eventSchema = new Schema<EventDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventTime: { type: String, required: true },
    place: { type: String, required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    maxParticipants: { type: Number, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: false },
  },
  { timestamps: true }
);

const EventModel = model<EventDocument>("Event", eventSchema);

export default EventModel;
