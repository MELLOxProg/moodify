const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache");
const blacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }
  const isTokenBlacklisted = await redis.get(token); // check if the token is blacklisted in Redis
  if (isTokenBlacklisted) {
    return res.status(401).json({ message: "Invalid token." });
  }
  // const istokenBlacklisted = await blacklistModel.findOne({ token });
  //   if (istokenBlacklisted) {
  //       return res.status(401).json({ message: "Invalid token." });
  //   }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // returns the payload of the token (here the user ID and username) if valid, otherwise throws an error.
    req.user = decoded; // dynamically created a new property.
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = {authUser};
