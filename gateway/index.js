import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/customers',proxy('http://localhost:5001'))
app.use('/orders',proxy('http://localhost:5002'))
app.use("/products", proxy("http://localhost:5003"));
app.use('/',(req,res)=>{
    res.status(200).send('Hello from the gateway service')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
