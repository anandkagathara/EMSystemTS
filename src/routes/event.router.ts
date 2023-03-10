// Importing necessary modules and functions
import express, { Router } from 'express';
import { createEvent, getEvents, joinEvent, leaveEvent, getEventParticipants, getEventCreatorDetails } from '../controllers/event.controller';
import authValidator from '../middlewares/auth.middleware';
import { validateEventCreate } from '../middlewares/validation.middleware';


const router: Router = express.Router();

router.post('/create',authValidator,validateEventCreate, createEvent);
router.get('/',authValidator, getEvents);
router.post('/join/:eventId',authValidator, joinEvent);
router.post('/leave/:eventId',authValidator, leaveEvent);
router.get('/participants/:eventId',authValidator, getEventParticipants);
router.get('/creator/:eventId',authValidator, getEventCreatorDetails);


export default router;