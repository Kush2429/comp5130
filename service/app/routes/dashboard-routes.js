import express from 'express';
import * as DashboardController from '../controllers/dashboard-controller.js';
import { passportAdminUserAuth } from '../utils/passportAuth.js';

const DashboardRouter = express.Router();

DashboardRouter.get('/', DashboardController.getDashboardData);

export default DashboardRouter;
