import mongoose from 'mongoose';
import { Schema } from 'mongoose';

// stripe subscription schema
const PaymentSubscriptionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  stripeSubscriptionId: { type: String, required: false },
  status: { type: String, required: false },
  recurringSuccessful_test: { type: Boolean, required: false },

  // endDate is a integer representing the end date of the subscription
  endDate: { type: Number, required: false },
  // timestamps
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

const PaymentSubscription = mongoose.model(
  'PaymentSubscription',
  PaymentSubscriptionSchema
);

export default PaymentSubscription;
