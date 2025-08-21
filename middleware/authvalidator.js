const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");

const authValidator = async (req, res, next) => {
  let reqHeader = req.headers.authorization;
  if (!reqHeader || !reqHeader.startsWith("Bearer ")) {
    console.log("send token");
  } else {
    let token = reqHeader.split(" ")[1];
    try {
      let userData = jwt.verify(token, "SeCrEaTkEy");
      let user = await userModel.findById(userData._id);
      req.user = user;
      next();
    } catch (err) {
      console.log("token expired");
    }
  }
};
module.exports = authValidator;
