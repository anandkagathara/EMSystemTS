// Importing necessary modules and functions
import express, { Router } from 'express';
import { createEvent, getEvents, joinEvent, leaveEvent, getEventParticipants, getEventCreatorDetails } from '../controllers/event.controller';
import authValidator from '../middlewares/auth.middleware';

// Creating an instance of Router
const router: Router = express.Router();

// Defining the routes and their respective handlers
router.post('/create',authValidator, createEvent);
router.get('/',authValidator, getEvents);
router.post('/join/:eventId',authValidator, joinEvent);
router.post('/leave/:eventId',authValidator, leaveEvent);
router.get('/participants/:eventId',authValidator, getEventParticipants);
router.get('/creator/:eventId',authValidator, getEventCreatorDetails);

// Exporting the router
export default router;