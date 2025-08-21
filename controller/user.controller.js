const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUser = async (req, res) => {
  try {
    const getUsers = await userModel.find();
    res.status(200).json({
      message: "Users gotten successfully",
      data: getUsers,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error getting Users",
      data: error,
    });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const getUsers = await userModel.findById(req.params.userID);
    res.status(200).json({
      message: "Single User gotten successfully",
      data: getUsers,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error getting Single User",
      data: error,
    });
  }
};

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const genSalt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, genSalt);

    const newUser = await userModel.create({
      name,
      email,
      password: hashpassword,
    });

    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      message: "Error Signing Up user",
      data: error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Ceck if the email exist obn the database
    const usermail = await userModel.findOne({ email });
    if (usermail) {
      const checkPassword = await bcrypt.compare(password, usermail.password);
      if (checkPassword) {
        const token = jwt.sign({ _id: usermail._id }, "SeCrEaTkEy", {
          expiresIn: "1h",
        });
        const { password, ...info } = usermail._doc;

        res.status(200).json({
          message: "Signedin Succ",
          data: token,
        });
      } else {
        res.status(400).json({
          message: "Incorrect Password",
        });
      }
    } else {
      res.status(400).json({
        message: "Mail not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error Signing In user",
      data: error,
    });
  }
};

// ProductModel.find({
//   userId: req.user._id
// })

module.exports = { getAllUser, signUp, getSingleUser, signIn };
