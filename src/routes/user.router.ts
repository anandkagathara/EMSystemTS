import express from 'express';
import { UserController } from '../controllers/user.controller';
import authValidator from '../middlewares/auth.middleware';
import {upload} from '../middlewares/upload.middleware';



const router = express.Router();
const userController = new UserController();

router.get('/',authValidator, userController.getAllUsers);
router.get('/:id',authValidator, userController.getUserById);
router.put('/updateUser', authValidator,userController.updateUser);
router.delete('/:id',authValidator, userController.deleteUser);
router.post('/uploadPhoto', authValidator, upload.single('profilePhoto'), userController.updatePhoto);

export { router as userRouter };
