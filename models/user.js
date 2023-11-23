import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    adresse: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['Client', 'Restaurant', 'Beneficiaire'],
      required: true,
    },
  },
  {
    timestamps: true,
    discriminatorKey: 'type',
  }
);

const User = model('User', userSchema);

export default User;
