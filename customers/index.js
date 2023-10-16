import express from "express";
import dotenv from "dotenv";
import customerRouter from "./routes/customer-routes.js";
import { dbConnect } from "./config/connection.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/customer/", customerRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello from the customer service");
});

app.listen(PORT, async() => {
  await dbConnect()
  console.log(`Server is running on port ${PORT}`);
});
