/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const path = require("path");

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, "./build")));

app.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log("Running. http://localhost:3001 or http://127.0.0.1:3001")
);
