import { catchAsync, HandleERROR } from "vanta-api";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Res from "../utils/response.js";

export const register = catchAsync(async (req, res, next) => {
  const { username = null, password = null } = req?.body;
  if (!username || !password)
    return next(new HandleERROR("Username and Password are required.", 400));
  // check the password regex
  const regex = /^(?=.*?[a-z])(?=.*?[0-9]).{6,}$/g;
  if (!regex.test(password))
    return next(new HandleERROR("Invalid Password.", 400));
  // hash password
  const hashedPass = bcryptjs.hashSync(password, 12);
  const newUser = await User.create({ username, password: hashedPass });
  const token = jwt.sign(
    { id: newUser._id, role: newUser.role, username: newUser.username },
    process.env.JWT_SECRET
  );
  return new Res(res, 201, {
    user: {
      username: newUser.username,
      role: newUser.role,
      id: newUser._id,
    },
    token,
    message: "User successfully created.",
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { username = null, password = null } = req?.body;
  if (!username || !password)
    return next(new HandleERROR("Username and Password are required.", 400));
  // find user
  const targetUser = await User.findOne({ username });
  if (!targetUser)
    return next(new HandleERROR("Username or Password is incorrect.", 400));
  const isMatch = bcryptjs.compareSync(password, targetUser.password);
  if (!isMatch)
    return next(new HandleERROR("Username or Password is incorrect.", 400));
  const token = jwt.sign(
    {
      id: targetUser._id,
      role: targetUser.role,
      username: targetUser.username,
    },
    process.env.JWT_SECRET
  );
  return new Res(res, 200, {
    user: {
      id: targetUser._id,
      username: targetUser.username,
      role: targetUser.role,
    },
    token,
    message: "Login successfully.",
  });
});
