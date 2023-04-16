const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 5001;

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});

//middleware
app.use(cors());
app.use(express.json);

//ROUTES//
app.use("/login", require("./routers/login"));
app.use("/dashboard", require("./routers/dashboard"));
