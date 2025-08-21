const productModel = require("../model/products.model");
const userModel = require("../model/user.model");
const cloudinary = require("../config/cloudinery");
const mongoose = require("mongoose");

const newProduct = async (req, res) => {
  try {
    const { productName, quantity, price, description } = req.body;

    const cloudImage = await cloudinary.uploader.upload(req.file.path);
    const getUser = await userModel.findById(req.params.productUserID);

    const postProduct = await new productModel({
      productName,
      quantity,
      price,
      description,
      productImage: cloudImage.secure_url,
      productImageID: cloudImage.public_id,
    });

    postProduct.productOwner = getUser;
    postProduct.save();

    getUser.product.push(new mongoose.Types.ObjectId(postProduct._id));
    getUser.save();

    res.status(201).json({
      message: "Product created Successfully",
      data: postProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create Product",
      data: error,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const getProduct = await productModel.find();
    res.status(200).json({
      message: "Product gotten Successfully",
      data: getProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to get Product",
      data: error,
    });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const getOne = await productModel.findById(req.params.id);
    res.status(200).json({
      message: "Product gotten Successfully",
      data: getOne,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to get one Product",
      data: error,
    });
  }
};

const getUserProduct = async (req, res) => {
  try {
    const userProduct = await userModel
      .findById(req.params.userID)
      .populate("product");
    res.status(200).json({
      message: "User product gotten successfully",
      data: userProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to get user Product",
      data: error,
    });
  }
};

module.exports = { newProduct, getAllProduct, getOneProduct, getUserProduct };
