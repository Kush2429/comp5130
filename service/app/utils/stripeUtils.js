import stripe from 'stripe';
import logger from './logger.js';
const stripeClient = new stripe(
  'sk_test_51P4y96IvqvtAvGHOaP1BkE6UcDHvSOUKCt8Cc70If3xRvVe7zijtIccNXe0LNuOqoy6R1xAXceUuqcNk28jg4vDy00tHJLIlTf'
);

/**
 * Retrieves a Stripe customer by email.
 *
 * @param {string} email - The email of the customer to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the response object from Stripe.
 */
export const getStripeCustomerByEmail = async (email) => {
  try {
    const customers = await stripeClient.customers.list({
      email,
      limit: 1,
    });
    return customers; // Return the entire response object from Stripe
  } catch (error) {
    logger.error('Error fetching Stripe customer:', error);
  }
};

/**
 * Retrieves the active subscriptions for a given customer.
 *
 * @param {string} customerId - The ID of the customer.
 * @returns {Promise<Object>} - A promise that resolves to the list of active subscriptions.
 */
export const getCustomerSubscriptions = async (customerId) => {
  const subscriptions = await stripeClient.subscriptions.list({
    customer: customerId,
    status: 'active',
    limit: 1,
  });

  return subscriptions;
};

/**
 * Creates a billing portal session for the given customer ID and return URL.
 * @param {string} customerId - The ID of the customer.
 * @param {string} return_url - The URL to redirect the customer to after they are done managing their billing portal session.
 * @returns {Promise<Object>} - A promise that resolves to the created billing portal session object.
 */
export const createBillingPortalSession = async (customerId, return_url) => {
  const sessions = await stripeClient.billingPortal.sessions.create({
    customer: customerId,
    return_url: return_url,
  });

  return sessions;
};

/**
 * Creates a new Stripe customer with the provided user email and Auth0 user ID.
 * @param {string} userEmail - The email of the user.
 * @param {string} auth0UserId - The Auth0 user ID of the user.
 * @returns {Promise<object>} - A promise that resolves to the created Stripe customer object.
 */
export const createStripeCustomer = async (userEmail, auth0UserId) => {
  const customer = await stripeClient.customers.create({
    email: userEmail,
    metadata: {
      userId: auth0UserId,
    },
  });

  return customer;
};

/**
 * Creates a checkout session for Stripe.
 * @param {Object} customer - The customer object.
 * @param {string} successUrl - The URL to redirect to after successful payment.
 * @param {string} cancelUrl - The URL to redirect to if payment is canceled.
 * @param {Array} lineItems - The line items for the checkout session.
 * @param {string} auth0UserId - The Auth0 user ID.
 * @returns {Object} - The created checkout session object.
 */
export const createCheckoutSession = async (
  customer,
  successUrl,
  cancelUrl,
  lineItems,
  auth0UserId
) => {
  const session = await stripeClient.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    payment_method_types: ['card'],
    mode: 'subscription',
    billing_address_collection: 'auto',
    line_items: lineItems,
    metadata: {
      userId: auth0UserId,
    },

    customer: customer.id, // Use the customer ID here
  });

  return session;
};

/**
 * Constructs a Stripe event from the raw body and signature.
 * @param {string} rawBody - The raw body of the webhook event.
 * @param {string} sig - The signature of the webhook event.
 * @returns {Promise<object>} - A promise that resolves to the constructed Stripe event.
 */
export const constructStripeEvent = async (rawBody, sig) => {
  const event = stripeClient.webhooks.constructEvent(
    rawBody,
    sig,
    process.env.WEBHOOK_SIGNING_SECRET
  );

  return event;
};

/**
 * Retrieves a subscription from Stripe.
 *
 * @param {string} subscription - The ID of the subscription to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the retrieved subscription object.
 */
export const retrieveSubscriptions = async (subscription) => {
  const res = await stripeClient.subscriptions.retrieve(subscription);
  return res;
};

/**
 * Retrieves a customer from Stripe.
 *
 * @param {string} customer - The ID of the customer to retrieve.
 * @returns {Promise<object>} - A promise that resolves to the retrieved customer object.
 */
export const retrieveCustomer = async (customer) => {
  const res = await stripeClient.customers.retrieve(customer);
  return res;
};

/**
 * Retrieves active subscriptions from Stripe.
 * @returns {Promise<Object>} A promise that resolves to the list of active subscriptions.
 */
export const getSubscriptions = async () => {
  const subscriptions = await stripeClient.subscriptions.list({
    status: 'active',
  });

  return subscriptions;
};

/**
 * Retrieves the balance from the Stripe client.
 * @returns {Promise<Object>} The balance object.
 */
export const getStripeBalance = async () => {
  const balance = await stripeClient.balance.retrieve();
  return balance;
};
