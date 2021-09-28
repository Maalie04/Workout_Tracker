const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const logger = require("morgan");
const viewRoutes = require("./routes/views");
const apiRoutes = require("./routes/api");

const app = express();
app.use(logger("dev"));

const PORT = process.env.PORT || 3000;
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(viewRoutes);
app.use(apiRoutes);
app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", 
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useUnifiedTopology: false
 });


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  


  