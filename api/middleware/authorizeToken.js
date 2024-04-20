import jwt from "jsonwebtoken";

export const authorizeToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("You are not authenticated");
  try {
    const userInfo = jwt.verify(token, process.env.JWT_KEY);
    req.user = userInfo;
    next();
  } catch (err) {
    return res.status(403).json("Invalid token");
  }
};
