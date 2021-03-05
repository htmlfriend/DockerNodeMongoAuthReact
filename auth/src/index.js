const express = require("express");

const { host, port, db } = require("./configuration/index");
const { connectDb } = require("./helpers/db");
const app = express();

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started auth service on port: ${port}`);
    console.log(`On host ${host}`);
    console.log(`Our db: ${db}`);
  });
};

// commits
app.get("/test", (req, res) => {
  res.send("Our auth server is working correctly");
});

connectDb()
  .on("error", console.log)
  .on("disconnect", connectDb)
  .once("open", startServer);
