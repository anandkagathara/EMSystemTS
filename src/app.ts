import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import mongoose from 'mongoose';

import { authRouter } from './routes/auth.router';
import { userRouter } from './routes/user.router';
import eventRouter  from './routes/event.router';


// import { profileRouter } from './routes/profile.router';

class App {
  public app: express.Application;

  
  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.setRoutes();

    this.app.listen(7000, () => {
      console.log('Server listening on port 3000');
    });
  }

  private setConfig() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());
  }

  private setMongoConfig() {
    const MONGO_URI = 'mongodb://localhost:27017/eventmanagementsystem';
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    
  }
  
  private setRoutes() {
    this.app.use('/api/auth', authRouter);
    this.app.use('/api/users', userRouter);
    this.app.use('/api/event', eventRouter);

  }
}

export default new App().app;
