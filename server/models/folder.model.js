import { Schema, model } from "mongoose";

const folderSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      match: [/^[a-zA-Z0-9_-]{3,15}$/g, "invalid Title."],
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    files: {
      type: Array,
      of: Schema.Types.ObjectId,
      ref: "File",
      default: [],
    },
  },
  { timestamps: true }
);

const Folder = model("Folder", folderSchema);

export default Folder;
