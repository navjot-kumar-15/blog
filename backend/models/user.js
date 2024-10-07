import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    default: "Guest",
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  phoneNumber: {
    type: String,
    unique: true,
    default: "",
  },
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  loginDetails: {
    ipAddress: {
      type: String,
      default: "",
    },
    location: {
      longitude: {
        type: Number,
        default: null,
      },
      latitude: {
        type: Number,
        default: null,
      },
    },
  },
  activeStatus: {
    type: String,
    default: false,
  },
});

const User = model("User", userSchema);
export default User;
