import express from 'express';
import { passportAuth, passportAdminUserAuth } from '../utils/passportAuth.js';
import * as ReportController from '../controllers/report-controller.js';

const ReportRouter = express.Router();

ReportRouter.post(
  '/create',
  (req, res, next) => {
    passportAuth(req, res, next);
  },
  ReportController.createReport
);

ReportRouter.get('/user-reports', ReportController.getUserReports);

ReportRouter.get(
  '/post-reports/:id',
  (req, res, next) => {
    passportAdminUserAuth(req, res, next);
  },
  ReportController.getPostReports
);

ReportRouter.get(
  '/all-reports',
  (req, res, next) => {
    passportAdminUserAuth(req, res, next);
  },
  ReportController.getAllReports
);

ReportRouter.get('/:id', ReportController.getReportById);

ReportRouter.put(
  '/:id/handle',
  (req, res, next) => {
    passportAdminUserAuth(req, res, next);
  },
  ReportController.handleReport
);

export default ReportRouter;
