import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const ReportSchema = new Schema({
  description: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: true, default: 'pending' },
  handledBy: { type: Schema.Types.ObjectId, ref: 'Admin', required: false },
  handledAt: { type: Date, required: false },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Report = mongoose.model('Report', ReportSchema);

export default Report;
