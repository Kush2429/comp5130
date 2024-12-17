import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const AdminUserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    validate: {
      validator: (v) => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v),
    },
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const AdminUser = mongoose.model('AdminUser', AdminUserSchema);

export default AdminUser;
