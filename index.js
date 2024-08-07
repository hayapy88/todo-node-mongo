const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

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

app.post("/api/customers", (req, res) => {
  const customer = {
    title: req.body.title,
    id: customers.length + 1,
  };
  customers.push(customer);
  res.send(customer);
});

app.put("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  customer.title = req.body.title;
  res.send(customer);
});
