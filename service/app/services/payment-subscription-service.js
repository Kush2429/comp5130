import PaymentSubscription from '../models/payment-subscription.js';

export const createPaymentSubscription = async (params) => {
  const res = await PaymentSubscription.create(params);

  return res;
};

export const updatePaymentSubscription = async (filter, params) => {
  const res = await PaymentSubscription.updateOne(filter, params);
  if (!res) {
    throw new Error('PaymentSubscription not found');
  }

  return res;
};

export const getActiveSubscription = async (userId) => {
  const res = await PaymentSubscription.findOne({
    user: userId,
    status: 'active',
  });

  if (!res) {
    return { message: 'No active subscription', success: false };
  }

  if (res.status !== 'active' || new Date(res.endDate) < new Date()) {
    return { message: 'No active subscription', success: false };
  }

  return { message: 'Active subscription found', success: true, subscription: res };
};
