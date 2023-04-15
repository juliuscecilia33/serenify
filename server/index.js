const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json);
app.use(cors());

//ROUTES//
app.use("/login", require());
app.use;
