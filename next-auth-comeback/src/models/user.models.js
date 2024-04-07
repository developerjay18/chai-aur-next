import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is mandatory'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is mandatory'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is mandatory'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
  },
  { timestamps: true }
);

const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;
