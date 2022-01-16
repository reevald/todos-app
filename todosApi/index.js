const express = require("express");
const path = require("path");

const router = require("./src/routes");

const app = express();
const port = 5000;

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api/v1/", router);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});