import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  phone: {
    type: Number,
    required: [true, "Phone is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Contact =
  mongoose.models.contact || mongoose.model("contact", contactSchema);

export default Contact;
