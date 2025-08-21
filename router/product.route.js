const express = require("express");
const router = express.Router();
const { productUpload } = require("../config/multer");
const {
  newProduct,
  getAllProduct,
  getOneProduct,
  getUserProduct,
} = require("../controller/product.controller");

router.route("/newproduct/:productUserID").post(productUpload, newProduct);
router.route("/getallproduct").get(getAllProduct);
router.route("/getoneproduct/:id").get(getOneProduct);
router.route("/getuserproduct/:userID").get(getUserProduct);

module.exports = router;
