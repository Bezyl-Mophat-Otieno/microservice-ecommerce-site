import { Router } from "express";
import createOrder from "../controllers/create-order.js";
import fetchOrders from "../controllers/fetch-orders.js";
import myOrders from "../controllers/my-orders.js";
const orderRouter = new Router();

orderRouter.post("/create", createOrder);
orderRouter.get("/get", fetchOrders);
orderRouter.get("/myorders/:id", myOrders);

export default orderRouter;
