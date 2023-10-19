import express from "express";
import dotenv from "dotenv";
import customerRouter from "./routes/customer-routes.js";
import { dbConnect } from "./config/connection.js";
import redis from "redis";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

const redisClient = redis.createClient();
redisClient.connect();

const subScribeToChannel = (channel) => {
  redisClient.subscribe(channel);
  redisClient.on("message", (channel, message) => {
    console.log("Message received: " + message);
    console.log("Channel: " + channel);
  });
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", customerRouter);

app.get("/", (req, res) => {
  subScribeToChannel("gateway");
  res.status(200).send("Hello from the customer service");
});

app.listen(PORT, async () => {
  await dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
