const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello, Node.js!");
});

const customers = [
  { title: "John", id: 1 },
  { title: "Adam", id: 2 },
  { title: "Emma", id: 3 },
  { title: "Sophia", id: 4 },
  { title: "William", id: 5 },
];

app.get("/api/customers", (req, res) => {
  res.send(customers);
});
