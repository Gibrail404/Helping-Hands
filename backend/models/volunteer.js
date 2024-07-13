import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  name: String,
  email: String,
  amount: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  paymentStatus: String,
});

export const Volunteer = mongoose.model("Volunteer", volunteerSchema);
