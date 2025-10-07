import { HandleERROR } from "vanta-api";

const IsAdmin = (req, res, next) => {
  if (req.userRole !== "admin" && req.userRole !== "superAdmin") {
    return next(new HandleERROR("Forbidden Access.", 403));
  }
  next();
};

export default IsAdmin;
