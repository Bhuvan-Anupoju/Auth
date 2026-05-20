import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWTVerficatonMiddleware = (req, res, next) => {
  let reqHeaders = req.header("authorization");
  if (!reqHeaders) {
    return res.status(404).json({ message: "Authorization header missing" });
  }
  let token = reqHeaders.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(404)
        .json({ message: "Authorization Alert, You are not admin" });
    }
    req.user = user;
    next();
  });
};
export default JWTVerficatonMiddleware;
