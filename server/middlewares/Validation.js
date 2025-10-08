import jwt from "jsonwebtoken";

const Validation = (req, res, next) => {
  try {
    const {
      role = null,
      id = null,
      username = null,
    } = jwt.verify(
      req?.headers?.authorization?.split(" ")[1],
      process.env.JWT_SECRET
    );
    req.userRole = role;
    req.userId = id;
    req.username = username;
  } catch (error) {
    req.userRole = null;
    req.userId = null;
    req.username = null;
  }
  next();
};

export default Validation;
