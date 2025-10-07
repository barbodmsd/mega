import { catchAsync, HandleERROR } from "vanta-api";
import Res from "../utils/response.js";
import { __dirname } from "../app.js";
import fs from "fs";

// upload single
export const uploadSingle = catchAsync(async (req, res, next) => {
  const file = req.file;
  console.log(res.file);
  if (!file) return next(new HandleERROR("Please upload a file.", 400));
  return new Res(res, 201, {
    data: file.filename,
    message: "Upload file successfully.",
  });
});

// upload multiple
export const uploadMultiple = catchAsync(async (req, res, next) => {
  const files = req.files;
  if (!files || files.length === 0)
    return next(new HandleERROR("Please upload files.", 400));
  const data = files.map((file) => file.filename);
  return new Res(res, 201, { data, message: "Upload files successfully." });
});

// delete file
export const deleteFile = catchAsync(async (req, res, next) => {
  const { file } = req?.body;
  if (!file) return next(new HandleERROR("File is required.", 400));
  if (fs.existsSync(__dirname + "/public/" + file))
    fs.unlinkSync(__dirname + "/public/" + file);
  return new Res(res, 200, { message: "File deleted successfully." });
});
