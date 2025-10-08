import { Schema, model } from "mongoose";

const folderSchema = Schema(
  {
    folderName: {
      type: String,
      required: [true, "Folder Name is required."],
      match: [/^[a-zA-Z0-9_-]{0,15}$/g, "invalid Folder Name."],
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
