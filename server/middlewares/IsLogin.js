import { HandleERROR } from "vanta-api";

const IsLogin = (req, res, next) => {
  if (!req.userRole || !req.userId) {
    return next(new HandleERROR("Unauthorized Access.", 401));
  }
  next();
};

export default IsLogin;
