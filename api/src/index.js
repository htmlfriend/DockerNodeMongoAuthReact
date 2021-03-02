const express = require("express");
const mongoose = require("mongoose");

const { host, port, db } = require("./configuration/index");
const { connectDb } = require("./helpers/db");
const app = express();
const postSchema = new mongoose.Schema({
  name: String,
});
const Post = mongoose.model("Post", postSchema);

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started api service on port: ${port}`);
    console.log(`On host ${host}`);
    console.log(`Our db: ${db}`);

    Post.find(function (err, posts) {
      if (err) return console.error;
      console.log(`post ${posts}`);
    });
    const post = new Post({ name: "New post" });
    post.save(function (err, result) {
      if (err) return console.error(err);
      console.log("savedWithVolume", result);
    });
  });
};

// commits
app.get("/test", (req, res) => {
  res.send("Our api server is working correctly");
});

connectDb()
  .on("error", console.log)
  .on("disconnect", connectDb)
  .once("open", startServer);
