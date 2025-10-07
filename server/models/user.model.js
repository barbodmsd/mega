import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: [true, "Username already taken."],
      match: [/^[a-zA-Z0-9_-]{3,15}$/g, "invalid Username."],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: [true, "Role is required."],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
