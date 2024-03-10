const express = require("express");
const router = express.Router();
const fs = require("fs");
// const uniqid = require("uniqid");
const { v4: uuidv4 } = require("uuid");

function readVideos() {
  const videosData = fs.readFileSync("./data/videos.json");
  const parsedData = JSON.parse(videosData);
  return parsedData;
}

// This middleware runs on every qequest to this router
router.use((_req, _res, next) => {
  console.log("Middleware from videos router");
  next();
});

//GET endpoint for all videos
router.get("/", (_req, res) => {
  //Respond with the videos data on the file
  res.json(readVideos());
});

// GET endpoint for an invididual video
router.get("/:id", (req, res) => {
  // Read the file and find the single note whose id matches the requested id
  const videos = readVideos();
  const singleVideo = videos.find((video) => video.id === req.params.id);

  // This would be a good place to check if the video was found 👀
  // Respond with the single video
  if (singleVideo) {
    res.json(singleVideo);
  } else {
    res.status(404).json({ message: "Video is not found" });
  }
});

// POST endpoint to add a video
router.post("/", (req, res) => {
  const { title, description } = req.body;
  // Make a new video with a unique ID
  const newVideo = {
    // id: uniqid(),
    id: uuidv4(),
    // title: req.body.title,
    title,
    channel: "Anonymous", //req.body.channel,
    image: "http://localhost:8080/images/upload-video-preview.jpg", //req.body.image,
    description,
    // description: req.body.description,
    views: "2,001,023",
    likes: "8",
    duration: "3:01",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: Date.now(),
    comments: [],
  };
  // 1. Read the current videos array
  // 2. Add to the videos array
  // 3. Write the entire new videos array to the file
  const videos = readVideos();
  videos.push(newVideo);
  fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
  // Respond with the video that was created
  res.status(201).json(newVideo);
});

// POST endpoint to add a comment
router.post("/:id/comments", (req, res) => {
  debugger;
  const { comment, name } = req.body;
  console.log(req.params.id);
  // Make a new comment with a unique ID
  const newComment = {
    //create a new unique id
    id: uuidv4(),
    // title: req.body.title,
    name: name,
    comment: comment,
    likes: "0",
    timestamp: Date.now(),
  };
  // 1. Read the current comments array
  // 2. Add to the comments array
  // 3. Write the entire new comments array to the file
  const videos = readVideos();
  let singleVideo = videos.find((videos) => videos.id === req.params.id);
  console.log(singleVideo.comments);
  singleVideo.comments.push(newComment);
  fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
  // Respond with the video that was createdwriteVideos
  res.status(201).json(newComment);
});

// DELETE endpoint to remove an individual video
router.delete("/:id", (req, res) => {
  /* TODO: ACTUALLY DO THESE STEPS */
  // 1. Read from the file
  const videos = readVideos();
  // 2. Mutate the array to remove the video with that id
  // filter for videos that don't have the req.params.id
  let removedVideosList = videos.filter((videos) => videos.id != req.params.id);
  console.log(`Removed list contains ${removedVideosList.length} video(s)`);
  // 3. Write the new array to the file
  fs.writeFileSync("./data/videos.json", JSON.stringify(removedVideosList));

  // Respond with a message that the video has been deleted
  res.status(204).send("You deleted a video");
});

// Finally, export the router for use in index.js
module.exports = router;
