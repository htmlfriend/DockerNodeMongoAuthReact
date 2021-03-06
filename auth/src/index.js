const express = require("express");
const axios = require("axios");
const { host, port, db, apiUrl } = require("./configuration/index");
const { connectDb } = require("./helpers/db");
const app = express();

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started auth service on port: ${port}`);
    console.log(`On host ${host}`);
    console.log(`Our db: ${db}`);
  });
};

// commits localhost:3002/test
app.get("/test", (req, res) => {
  res.send("Our auth server is working correctly");
});

// test localhost:3002/api/currentUser
// localhost:3001/currentUser
app.get("/api/currentUser", (req, res) => {
  res.json({
    currentuser: true,
    email: "foo@test.com",
  });
});

// from api request to auth
// localhost:3001/api/testwithapidata
app.get("/testwithapidata", (req, res) => {
  axios.get(apiUrl + "/testapidata").then((response) => {
    res.json({
      testApiData: response.data.testwithapi,
    });
  });
});
connectDb()
  .on("error", console.log)
  .on("disconnect", connectDb)
  .once("open", startServer);
