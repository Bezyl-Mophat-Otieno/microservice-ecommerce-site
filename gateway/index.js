import express, { json, request } from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import redis from "redis";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const redisClient = redis.createClient();
redisClient.connect();
redisClient.on("connect", () => {
  console.log("Connected to redis");
});
redisClient.on("error", (err) => {
  console.log(err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/customers", proxy("http://localhost:5001"));
app.use("/orders", proxy("http://localhost:5002"));
app.use(
  "/products",
  proxy("http://localhost:5003", {
    proxyReqPathResolver: (req) => {
      return "/products/fetch";
    },
    userResDecorator: async (proxyRes, proxyResData, userReq, userRes) => {
      // Add caching logic here
      let isCached = false;
      let products = [];

      // Check if the data is cached

      if (!isCached) {
        products = await redisClient.get("products");
        JSON.stringify(products)
        return userRes.status(200).json(products);
      } else {
        try {
          products = JSON.parse(proxyResData.toString("utf8"));
          console.log(products);
          redisClient.set("products", JSON.stringify(products));
          isCached = true;
          console.log("Products from database");
          userRes.status(200).json(products);
        } catch (error) {
          console.error("Error parsing response data:", error);
        }
        return proxyResData;
      }
    },
  })
);
// cache middleware

app.use("/", (req, res) => {
  res.status(200).send("Hello from the gateway service");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
