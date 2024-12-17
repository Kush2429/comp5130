import express from 'express';
import * as PaymentSubscriptionController from '../controllers/payment-subscription-controller.js';
import { passportAuth } from '../utils/passportAuth.js';

const PaymentSubscriptionRouter = express.Router();

PaymentSubscriptionRouter.post(
  '/create-stripe-session-subscription',
  (req, res, next) => {
    passportAuth(req, res, next);
  },
  PaymentSubscriptionController.createSubscription
);

// webhook for subscription
PaymentSubscriptionRouter.post(
  '/stripe-webhook',
  express.raw({ type: 'application/json' }),
  PaymentSubscriptionController.webhook
);

PaymentSubscriptionRouter.get(
  '/get-active-subscription',
  (req, res, next) => {
    passportAuth(req, res, next);
  },
  PaymentSubscriptionController.getActiveSubscription
);

export default PaymentSubscriptionRouter;
