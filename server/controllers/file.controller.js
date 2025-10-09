import ApiFeatures, { catchAsync } from "vanta-api";
import File from "../models/file.model.js";
import Res from "../utils/response.js";

// get all files
export const getAllFiles = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(File, req?.query, req.userRole)
    .addManualFilters(req.userRole === "admin" ? {} : { userId: req.userId })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([{ path: "folderId" }]);
  const result = await features.execute();
  return new Res(res, 200, result);
});
