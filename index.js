const express = require("express");
const app = express();
require("dotenv").config()
const cookie = require("cookie-parser")
const connectToMongo = require("./connection");
const autRouter = require("./router/auth");
const projectRouter = require("./router/project");
const taskRouter = require("./router/tasks");
const fileUplader = require("express-fileupload")
const { validateAuthToken } = require("./middleware/auth");
app.use(express.urlencoded({ extended: false }));
// enable for other router;
// app.use(validateAuthToken())
app.use(express.json())
app.use(cookie())
app.use(fileUplader())
app.use("/public", express.static("public"));

connectToMongo(process.env.MONGO_URL);

// auth api's
app.use("/api", autRouter);

// project api's
app.use("/api", validateAuthToken("token"), projectRouter);
// app.use(express.static('./public'))

app.use("/api", validateAuthToken("token"), taskRouter);
app.listen(process.env.PORT, () =>
  console.log(`App started at port ${process.env.PORT}`)
);


