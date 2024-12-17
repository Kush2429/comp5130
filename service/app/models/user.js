import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    validate: {
      validator: (v) => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v),
    },
  },
  name: { type: String, required: true },
  password: { type: String, required: true },
  street: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  zip: { type: String, required: false },
  phone: { type: String, required: false },
  createdAt: { type: Date, required: true, default: Date.now },
});

const User = mongoose.model('User', UserSchema);

export default User;
