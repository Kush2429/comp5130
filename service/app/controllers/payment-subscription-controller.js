import { setResponse, setResponseWithError } from './response-handler.js';
import * as PaymentSubscriptionService from '../services/payment-subscription-service.js';
import PaymentSubscription from '../models/payment-subscription.js';
import * as UserService from '../services/user-service.js';
import {
  constructStripeEvent,
  createBillingPortalSession,
  createCheckoutSession,
  createStripeCustomer,
  getCustomerSubscriptions,
  getStripeCustomerByEmail,
  retrieveCustomer,
  retrieveSubscriptions,
} from '../utils/stripeUtils.js';
import logger from '../utils/logger.js';

export const createSubscription = async (req, res) => {
  const userEmail = req.user.email;
  let customer;
  const auth0UserId = userEmail;

  // Try to retrieve an existing customer by email
  const existingCustomers = await getStripeCustomerByEmail(userEmail);

  //   logger.info(existingCustomers);

  if (existingCustomers.data.length > 0) {
    // Customer already exists
    customer = existingCustomers.data[0];

    // Check if the customer already has an active subscription
    const subscriptions = await getCustomerSubscriptions(customer.id);

    if (subscriptions.data.length > 0) {
      // Customer already has an active subscription, send them to biiling portal to manage subscription

      const stripeSession = await createBillingPortalSession(
        customer.id,
        'http://localhost:4000'
      );

      return res.status(409).json({ redirectUrl: stripeSession.url });
    }
  } else {
    // No customer found, create a new one
    customer = await createStripeCustomer(userEmail, auth0UserId);
  }

  //   logger.info(customer);

  // Now create the Stripe checkout session with the customer ID
  const session = await createCheckoutSession(
    customer,
    'http://localhost:4000?success=true',
    'http://localhost:4000?success=false',
    [
      {
        price_data: {
          currency: 'USD',
          product_data: {
            name: 'Roomy Monthly Subscription',
            description: 'Roomy Monthly Subscription',
          },
          unit_amount: 2000,
          recurring: {
            interval: 'month',
          },
        },
        quantity: 1,
      },
    ],
    auth0UserId
  );

  res.json({ id: session.id });
};

export const webhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = await constructStripeEvent(req.rawBody, sig);
  } catch (err) {
    logger.info(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object;

    // On payment successful, get subscription and customer details
    const subscription = await retrieveSubscriptions(event.data.object.subscription);
    const customer = await retrieveCustomer(event.data.object.customer);

    //   logger.info(subscription,customer);

    if (invoice.billing_reason === 'subscription_create') {
      // Handle the first successful payment
      // DB code to update the database for first subscription payment

      const subscriptionDocument = {
        user: await UserService.getUser({ email: customer?.metadata?.userId }),
        stripeSubscriptionId: event.data.object.subscription,
        endDate: subscription.current_period_end * 1000,
        status: 'active',
      };

      // // Insert the document into the collection
      // const result = await subscriptions.insertOne(subscriptionDocument);
      const result = await PaymentSubscriptionService.createPaymentSubscription(
        subscriptionDocument
      );
      logger.info(`A document was inserted with the _id: ${result._id}`);
      logger.info(
        `First subscription payment successful for Invoice ID: ${customer.email} ${customer?.metadata?.userId}`
      );
    } else if (
      invoice.billing_reason === 'subscription_cycle' ||
      invoice.billing_reason === 'subscription_update'
    ) {
      // Handle recurring subscription payments
      // DB code to update the database for recurring subscription payments

      // Define the filter to find the document with the specified userId
      // const filter = { userId: customer?.metadata?.userId };
      const filter = {
        user: await UserService.getUser({ email: customer?.metadata?.userId }),
      };

      // Define the update operation to set the new endDate
      const updateDoc = {
        $set: {
          endDate: subscription.current_period_end * 1000,
          recurringSuccessful_test: true,
          updatedAt: new Date(),
        },
      };

      // Update the document
      const result = await PaymentSubscriptionService.updatePaymentSubscription(
        filter,
        updateDoc
      );

      if (result.matchedCount === 0) {
        logger.info('No documents matched the query. Document not updated');
      } else if (result.modifiedCount === 0) {
        logger.info('Document matched but not updated (it may have the same data)');
      } else {
        logger.info(`Successfully updated the document`);
      }

      logger.info(
        `Recurring subscription payment successful for Invoice ID: ${invoice.id}`
      );
    }

    logger.info(
      new Date(subscription.current_period_end * 1000),
      subscription.status,
      invoice.billing_reason
    );
  }

  // For canceled
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object;
    // logger.info(event);
    if (subscription.status === 'canceled') {
      logger.info(`Subscription ${subscription.id} was canceled.`);
      // DB code to update the customer's subscription status in your database
      await PaymentSubscriptionService.updatePaymentSubscription(
        { stripeSubscriptionId: subscription.id },
        {
          status: 'canceled',
          updatedAt: new Date(),
        }
      );
    }
  }

  // For canceled/renewed subscription
  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object;
    // logger.info(event);
    if (subscription.cancel_at_period_end) {
      logger.info(`Subscription ${subscription.id} was canceled.`);
      // DB code to update the customer's subscription status in your database
      await PaymentSubscriptionService.updatePaymentSubscription(
        { stripeSubscriptionId: subscription.id },
        {
          updatedAt: new Date(),
        }
      );
    } else {
      logger.info(`Subscription ${subscription.id} was restarted.`);
      await PaymentSubscriptionService.updatePaymentSubscription(
        { stripeSubscriptionId: subscription.id },
        {
          status: 'active',
          endDate: subscription.current_period_end * 1000,
          updatedAt: new Date(),
        }
      );
    }
  }

  res.status(200).end();
};

export const getActiveSubscription = async (req, res) => {
  const user = req.user._id;
  const subscription = await PaymentSubscriptionService.getActiveSubscription(user._id);

  setResponse(res, subscription);
};
