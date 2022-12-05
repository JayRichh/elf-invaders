const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
// config
const { PORT, MONGO_URI } = require("./config.js");
// routes
const Player = require("./routes/api/player");
const Elf = require("./routes/api/elf");
const HighScore = require("./routes/api/highScore");
const serveStatic = require("serve-static");
const path = require("path");
require("dotenv").config();

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`MongoDB database Connected... ${MONGO_URI}`))
  .catch((err) => console.log(err));

app.use(cors()); // to allow cross origin requests
app.use(bodyParser.json()); // to convert the request into JSON

app.use("/api/", Player);
app.use("/api/", Elf);
app.use("/api/", HighScore);

app.use(serveStatic(path.join(__dirname, "/build/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "/build/dist", "index.html"));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
