import { Schema, model } from "mongoose";

const fileSchema = Schema(
  {
    fileName: {
      type: String,
      required: [true, "FileName is required."],
    },
    folderId: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const File = model("File", fileSchema);

export default File;
