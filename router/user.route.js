const express = require("express");
const router = express.Router();
const { getAllUser, signUp, signIn } = require("../controller/user.controller");
const authValidator = require("../middleware/authvalidator");

router.route("/getalluser").get(getAllUser);
router.route("/signup").post(signUp);
router.route("/signin").post(signIn);

router.get("/", authValidator, getAllUser);

module.exports = router;
