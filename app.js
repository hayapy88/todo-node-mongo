const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`ToDo app listening on port ${port}`);
});
