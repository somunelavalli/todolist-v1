const express = require("express");
const bodyParser = require("body-parser");

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

const port = process.env.PORT || 3000;
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  const date = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  const day = date.toLocaleDateString("en-US", options);
  res.render("list", { listTitle: day, listOfItems: items });
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", listOfItems: workItems });
});

app.post("/", (req, res) => {
  //   console.log(req.body);
  const item = req.body.newItem;

  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log("Server is Up on Port " + port);
});
