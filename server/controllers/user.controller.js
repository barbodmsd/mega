import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import User from "../models/user.model.js";
import Res from "../utils/response.js";

// get all users
export const getAllUsers = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User, req.query, req.userRole)
    .filter()
    .limitFields()
    .paginate()
    .sort();
  const result = await features.execute();
  return new Res(res, 200, result);
});

// get user by id
export const getUserById = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User, req.query, req.userRole)
    .addManualFilters(
      req.userRole === "admin" ? { _id: req.params.id } : { _id: req.userId }
    )
    .filter()
    .limitFields()
    .paginate()
    .sort();
  const result = await features.execute();
  if (!result?.data || result.data.length === 0)
    return next(new HandleERROR("User not found.", 404));

  return new Res(res, 200, result);
});

// delete user
export const deleteUser = catchAsync(async (req, res, next) => {
  if (req.userId === req.params.id)
    return next(new HandleERROR("You cannot delete yourself.", 400));
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) return next(new HandleERROR("User not found.", 404));
  return new Res(res, 200, {
    deletedUser,
    message: "User deleted successfully.",
  });
});
