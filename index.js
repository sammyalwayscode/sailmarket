const express = require("express");
const app = express();
const PORT = 2322;
const cors = require("cors");
require("./config/db");
const userRouter = require("./router/user.route");
const productRouter = require("./router/product.route");

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.json({
    message: "Server up and running 🚀",
  });
});

app.use("/api/users", userRouter);
app.use("/api/product", productRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
