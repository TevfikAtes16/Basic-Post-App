const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

//Dotenv
dotenv.config();

//MongoDB Connection
connectDB();

//Rest Object
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/post", require("./routes/postRoutes"));

//Port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server running ${PORT}`.bgGreen.white);
});
