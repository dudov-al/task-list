const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const path = require("path");
const todoRoutes = require("./routes/todos");

const PORT = process.env.PORT;

const app = express();
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

const db = process.env.MONGODB_URL

app.engine("hbs", hbs.engine);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(todoRoutes);

async function start() {
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }
    );
    app.listen(PORT, () => {
      console.log("Server has been started on port "+ PORT);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
