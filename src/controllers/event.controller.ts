import { Request, Response } from "express";
import { EventService } from "../services/event.service";

export const createEvent = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user._id.toString();
    const eventService = new EventService();
    const event = await eventService.createEvent(userId, req.body);
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error: unknown) {
    const statusCode = (error as any).statusCode || 500;
    const message = (error as any).message || "Internal Server Error";
    res.status(statusCode).json({ message });
  }
};

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventService = new EventService();
    const events = await eventService.getEvents();
    res.status(200).json({ events });
  } catch (error: unknown) {
    const statusCode = (error as any).statusCode || 500;
    const message = (error as any).message || "Internal Server Error";
    res.status(statusCode).json({ message });
  }
};

export const joinEvent = async (req: any, res: Response): Promise<void> => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user._id.toString();
    const eventService = new EventService();
    const updatedEvent = await eventService.joinEvent(eventId, userId);
    res.status(200).json({ updatedEvent });
  } catch (error: unknown) {
    const statusCode = (error as any).statusCode || 500;
    const message = (error as any).message || "Internal Server Error";
    res.status(statusCode).json({ message });
  }
};

export const leaveEvent = async (req: any, res: Response): Promise<void> => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user.id.toString();
    const eventService = new EventService();
    const updatedEvent = await eventService.leaveEvent(eventId, userId);
    res.status(200).json({ updatedEvent });
  } catch (error: unknown) {
    const statusCode = (error as any).statusCode || 500;
    const message = (error as any).message || "Internal Server Error";
    res.status(statusCode).json({ message });
  }
};

export const getEventParticipants = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const eventId = req.params.eventId;
    const eventService = new EventService();
    const participants = await eventService.getEventParticipants(eventId);
    res.status(200).json({ participants });
  } catch (error: unknown) {
    const statusCode = (error as any).statusCode || 500;
    const message = (error as any).message || "Internal Server Error";
    res.status(statusCode).json({ message });
  }
};

export const getEventCreatorDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const eventId = req.params.eventId;
    const eventService = new EventService();
    const creator = await eventService.getEventCreatorDetails(eventId);
    res.status(200).json({ creator });
  } catch (error: unknown) {
    const statusCode = (error as any).statusCode || 500;
    const message = (error as any).message || "Internal Server Error";
    res.status(statusCode).json({ message });
  }
};
