import { EventDocument } from "../models/event.model";
import Event from "../models/event.model";
import mongoose from "mongoose";

export class EventService {
  async createEvent(userId: any, eventData: any): Promise<EventDocument> {
    eventData.creator = userId;
    const event = await Event.create(eventData);
    return event;
  }

  async getEvents(): Promise<EventDocument[]> {
    const events = await Event.find();
    return events;
  }

  async joinEvent(eventId: string, userId: any): Promise<EventDocument> {
    const event = await Event.findById(eventId);
    if (!event) {
      throw { statusCode: 404, message: "Event not found" };
    }
    if (event.participants.includes(userId)) {
      throw { statusCode: 400, message: "User is already a participant" };
    }
    if (event.participants.length >= event.maxParticipants) {
      throw { statusCode: 400, message: "Event is full" };
    }
    event.participants.push(userId);
    const updatedEvent = await event.save();
    return updatedEvent;
  }

  async leaveEvent(eventId: string, userId: any): Promise<any> {
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        throw { statusCode: 404, message: "Event not found" };
      }
      const userIdObj: any = new mongoose.Types.ObjectId(userId);
      if (
        !event.participants.some((participant) => participant.equals(userIdObj))
      ) {
        throw { statusCode: 400, message: "User is not a participant" };
      }
      event.participants = event.participants.filter(
        (participant) => !participant.equals(userIdObj)
      );
      const updatedEvent = await event.save();
      return updatedEvent;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  async getEventParticipants(eventId: string): Promise<string[]> {
    const event = await Event.findById(eventId).populate("participants");
    if (!event) {
      throw { statusCode: 404, message: "Event not found" };
    }
    const participants = event.participants.map(
      (participant) => participant.email
    );
    return participants;
  }

  async getEventCreatorDetails(eventId: string): Promise<any> {
    const event = await Event.findById(eventId).populate("creator");
    if (!event) {
      throw { statusCode: 404, message: "Event not found" };
    }
    const creator = event.creator;
    return creator;
  }
}
