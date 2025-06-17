import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
     name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [4, "Name must be at least 4 characters"],
    maxlength: [50, "Name must be at most 50 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    minlength: [5, "Email must be at least 5 characters"],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
    lowercase: true,
    trim: true,
  },
  phone: {
     type: String,
    required: [true, "Phone number is required"],
    minlength: [10, "Phone number must be at least 10 digits"],
    maxlength: [15, "Phone number must be at most 15 digits"],
    trim: true,
  },

})

const ContactModel = mongoose.model("Contact", contactSchema);

export default ContactModel;

