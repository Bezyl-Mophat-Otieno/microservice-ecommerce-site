import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/connection.js";
import productRouter from "./routes/product-routes.js";
import redis from "redis";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5003;
const redisClient = redis.createClient();
redisClient.connect();
redisClient.on("connect", () => {
  console.log("Connected to redis");
});
redisClient.subscribe("gateway");

redisClient.on("message", (channel, message) => {
  console.log(`Message from ${channel}: ${message}`);
});
redisClient.on("error", (err) => {
  console.log(err);
});



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/products", productRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello from the products service");
});

app.listen(PORT, async () => {
  await dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
