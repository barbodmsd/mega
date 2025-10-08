import fs from "fs";
import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import { __dirname } from "../app.js";
import Folder from "../models/folder.model.js";
import Res from "../utils/response.js";

// get all folders
export const getAllFolders = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Folder, req?.query, req.userRole)
    .addManualFilters(req.userRole === "admin" ? {} : { userId: req.userId })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([{ path: "userId", select: "username" }, { path: "files" }]);
  const result = await features.execute();
  return new Res(res, 200, result);
});

// create a new folder
export const createFolder = catchAsync(async (req, res, next) => {
  const { folderName = null } = req?.body;
  if (!folderName)
    return next(new HandleERROR("Folder Name is required.", 400));

  const normalizeFolderName = folderName?.split("/").at(-1);
  const folderPath = `${__dirname}/public/${req.username}/${normalizeFolderName}`;
  // if the folder was exist then return an error
  if (fs.existsSync(folderPath))
    return next(new HandleERROR("Folder is exist.", 400));

  const newFolder = await Folder.create({
    folderName: normalizeFolderName,
    userId: req.userId,
  });
  // if the folder didn't exist then create it
  fs.mkdirSync(folderPath, {
    recursive: true,
  });
  return new Res(res, 201, {
    data: newFolder,
    message: "Folder created successfully.",
  });
});

// delete folder
export const deleteFolder = catchAsync(async (req, res, next) => {
  const targetFolder = await Folder.findById(req.params.id);
  if (!targetFolder?._id)
    return next(new HandleERROR("Folder does not exist in DB.", 404));
  if (req.userId != targetFolder.userId && req.userRole !== "admin")
    return next(
      new HandleERROR("You do not have access to delete this folder.", 403)
    );
  const normalizeFolderName = targetFolder?.folderName?.split("/").at(-1);
  const folderPath = `${__dirname}/public/${req.username}/${normalizeFolderName}`;
  if (!fs.existsSync(folderPath))
    return next(new HandleERROR("Folder doesn't exist.", 400));

  fs.rmdirSync(folderPath, { recursive: true });
  const deletedFolder = await Folder.findByIdAndDelete(req.params.id);

  return new Res(res, 200, {
    deletedFolder,
    message: "Folder deleted successfully.",
  });
});
