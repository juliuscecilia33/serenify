const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json);

//ROUTES//
app.use("/login", require("./routers/login"));
app.use("/dashboard", require("./routers/dashboard"));
