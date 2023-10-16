import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/connection.js";
import productRouter from "./routes/product-routes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5003;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/product/", productRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello from the products service");
});

app.listen(PORT, async () => {
  await dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
