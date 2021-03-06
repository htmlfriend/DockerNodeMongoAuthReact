const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const { host, port, db, authApiUrl } = require("./configuration/index");
const { connectDb } = require("./helpers/db");
const app = express();
const postSchema = new mongoose.Schema({
  name: String,
});
const Post = mongoose.model("Post", postSchema);

// commits
app.get("/test", (req, res) => {
  res.send("Our api server is working correctly");
});

// check login users
app.get("/currentUser", (req, res) => {
  axios.get(authApiUrl + "/currentUser").then((response) => {
    res.json({
      id: "124",
      email: "test@test.com",
      currentUserFromAuth: response.data,
    });
  });
});

// data from auth
app.get("/api/testapidata", (req, res) => {
  res.json({
    testwithapi: true,
  });
});
const startServer = () => {
  app.listen(port, () => {
    console.log(`Started api service on port: ${port}`);
    console.log(`On host ${host}`);
    console.log(`Our db: ${db}`);

    // Post.find(function (err, posts) {
    //   if (err) return console.error;
    //   console.log(`post ${posts}`);
    // });
    const post = new Post({ name: "New post" });
    post.save(function (err, result) {
      if (err) return console.error(err);
      console.log("savedWithVolume", result);
    });
  });
};

connectDb()
  .on("error", console.log)
  .on("disconnect", connectDb)
  .once("open", startServer);
