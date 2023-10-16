import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "../customers/config/connection.js";
import orderRouter from "./routes/order-routes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/order/", orderRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello from the orders service");
});

app.listen(PORT, async () => {
  await dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
