const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
// Joi.objectId = require("joi-objectid")(Joi);
const users = require("./routes/users");
const auth = require("./routes/auth");
const projects = require("./routes/projects");
const colaboratorsReq = require("./routes/colaboratorsReq");
const colaborator = require("./routes/colaborators");
const { Colaborator } = require("./models/colaborator");
const { ColaboratorReq } = require("./models/colaboratorReq");

const app = express();
require("dotenv").config();

const { APP_USER, APP_USER_PASSWORD } = process.env;

mongoose
  .connect(
    `mongodb+srv://${APP_USER}:${APP_USER_PASSWORD}@procolab.1cmdh.mongodb.net/ProColab?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/projects", projects);
app.use("/api/colaboratorsReq", colaboratorsReq);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log("listening to port 5000"));
