import fs from "fs";
import { catchAsync, HandleERROR } from "vanta-api";
import { __dirname } from "../app.js";
import File from "../models/file.model.js";
import Folder from "../models/folder.model.js";
import Res from "../utils/response.js";

// upload single
export const uploadFile = catchAsync(async (req, res, next) => {
  const file = req.file;
  if (!file) return next(new HandleERROR("Please upload a file.", 400));
  const newFile = await File.create({
    fileName: file.filename,
    userId: req.userId,
    folderId: req.body.folderId,
  });
  const targetFolder = await Folder.findByIdAndUpdate(
    req.body.folderId,
    {
      $push: { files: newFile._id },
    },
    { new: true }
  );
  return new Res(res, 201, {
    data: { fileName: newFile?.fileName, folderName: targetFolder?.folderName },
    message: "Upload file successfully.",
  });
});

// delete file
export const deleteFile = catchAsync(async (req, res, next) => {
  const targetFile = await File.findById(req.params.id).populate("folderId");
  if (!targetFile?._id)
    return next(new HandleERROR("File does not exist in DB.", 404));
  if (req.userId != targetFile.userId && req.userRole !== "admin")
    return next(
      new HandleERROR("You do not have access to delete this file.", 403)
    );
  const filePath = `${__dirname}/public/${req.username}/${targetFile?.folderId?.folderName}/${targetFile?.fileName}`;
  if (!fs.existsSync(filePath))
    return next(new HandleERROR("File does not exist in that path.", 404));

  await File.findByIdAndDelete(req.params?.id);
  await Folder.findByIdAndUpdate(targetFile?.folderId?._id, {
    $pull: { files: targetFile?._id },
  });
  fs.unlinkSync(filePath);

  return new Res(res, 200, { message: "File deleted successfully." });
});
