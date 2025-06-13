const express = require("express");
const {connectMongoDb} = require('./connection.js');

const userRouter = require("./routes/user.routes.js");
const {logReqRes} = require("./middlewares/index.mid.js");
const app = express();
const PORT = 8000;

//Connection
connectMongoDb("mongodb://127.0.0.1:27017/user-management")
.then(() => console.log("MongoDB Connected!"));
//middleware
app.use(express.urlencoded({extended: false}));
app.use(logReqRes("log.txt"));
//Routes
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));


