const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || process.argv[2] || 8080;
// const { v4: uuidv4 } = require("uuid");
const videosRoute = require("./routes/videos");
require("dotenv").config();

// this middleware allows us to post JSON in request.body
app.use(cors()); //accept all hosts "*""

// this middleware implements Cross origin Resource Sharing (CORS)
app.use(express.json());

/////
// This middleware allows us to serve static files from a folder.
// Keep in mind that the folder name will *not* be part of the request path.
// app.use("/static-files", express.static("files"));
// app.use("/static", express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public")); //"public" //http://localhost:8080/images/Upload-video-preview.jpg

// This middleware is just a basic example that runs on every request
// Calling next() is how you pass control to the next middleware
app.use((_req, _res, next) => {
  console.log("Middleware running");
  next();
});

// This middleware is another basic example that runs on every request
app.use((_req, _res, next) => {
  console.log("Middleware number 2 running");
  next();
});

// This middleware checks if we're getting JSON headers on our POST requests
// You can send a response right here and *not* call next() if you don't want to proceed.
app.use((req, res, next) => {
  if (
    req.method === "POST" &&
    req.headers["content-type"] !== "application/json"
  ) {
    return res.status(400).send("Hey, you need to give me proper JSON");
  }

  // If all is well, continue to the next middleware
  next();
});

/////
// To use routing, we define the endpoint using middleware syntax.
// The first paramater is the path, and the second is the router module.
// Your routes will be available at this path slash whatever your router endpoints are.
app.use("/videos", videosRoute);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
