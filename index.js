const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || process.argv[2] || 8080;
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
// const { PORT } = process.env;

app.use(express.json());
app.use(cors()); //accept all hosts "*""

let videos = [
  {
    id: "84e96018-4022-434e-80bf-000ce4cd12b8",
    title: "BMX Rampage: 2021 Highlights",
    channel: "Red Crow",
    image: "https://project-2-api.herokuapp.com/images/image0.jpg",
  },
  {
    id: "c05b9a93-8682-4ab6-aff2-92ebb4bbfc14",
    title: "Become A Travel Pro In One Easy Lesson",
    channel: "Todd Welch",
    image: "https://project-2-api.herokuapp.com/images/image1.jpg",
  },
  {
    id: "25ce5d91-a262-4dcf-bb87-42b87546bcfa",
    title: "Les Houches The Hidden Gem Of The Chamonix",
    channel: "Cornelia Blair",
    image: "https://project-2-api.herokuapp.com/images/image2.jpg",
  },
  {
    id: "b6f35f03-7936-409b-bd2a-446bcc5f30e7",
    title: "Travel Health Useful Medical Information For",
    channel: "Glen Harper",
    image: "https://project-2-api.herokuapp.com/images/image3.jpg",
  },
  {
    id: "1b964601-a6dd-4fcc-b5f3-1000338c9557",
    title: "Cheap Airline Tickets Great Ways To Save",
    channel: "Emily Harper",
    image: "https://project-2-api.herokuapp.com/images/image4.jpg",
  },
  {
    id: "9c268c0a-83dc-4b96-856a-bb5ded2772b1",
    title: "Take A Romantic Break In A Boutique Hotel",
    channel: "Ethan Owen",
    image: "https://project-2-api.herokuapp.com/images/image5.jpg",
  },
  {
    id: "fc5261d1-58a0-47e4-9c19-2b7a1715fa1b",
    title: "Choose the Perfect Accommodations",
    channel: "Lydia Perez",
    image: "https://project-2-api.herokuapp.com/images/image6.jpg",
  },
  {
    id: "99478bed-6428-49ed-8eaa-f245a5414336",
    title: "Cruising Destination Ideas",
    channel: "Timothy Austin",
    image: "https://project-2-api.herokuapp.com/images/image7.jpg",
  },
  {
    id: "76ca28c0-7dea-4553-887f-8e5129a80fc3",
    title: "Train Travel On Track For Safety",
    channel: "Scotty Cranmer",
    image: "https://project-2-api.herokuapp.com/images/image8.jpg",
  },
];

app.get("/videos", (req, res) => {
  console.log("GET videos......");
  res.json(videos);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
