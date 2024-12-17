import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import ininializeRoutes from './routes/index.js';
import passport from 'passport';
import { initPassport } from './middlewares/passport-config.js';
import morganMiddleware from './middlewares/morgan.middleware.js';

/**
 * Initializes the application.
 *
 * @param {Object} app - The Express application object.
 */
const init = (app) => {
  const MONGO_URI = process.env.MONGO_CONNECTION_STRING;

  initPassport(passport);

  // Add the morgan middleware
  app.use(morganMiddleware);
  app.use(cors());
  app.use(
    express.json({
      limit: '5mb',
      verify: (req, res, buf) => {
        req.rawBody = buf.toString();
      },
    })
  );
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());

  mongoose.connect(MONGO_URI, {});

  console.log('Connected to MongoDB');

  ininializeRoutes(app);
};

export default init;
