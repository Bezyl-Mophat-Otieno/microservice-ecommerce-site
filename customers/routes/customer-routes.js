import { Router } from "express";
import regsisterCustomer from "../controllers/register-customer.js";
import loginCustomer from "../controllers/login-customer.js";
import fetchCustomers from "../controllers/fetch-customers.js";

const customerRouter = new Router();

customerRouter.post("/register", regsisterCustomer);
customerRouter.post("/login", loginCustomer);
customerRouter.get("/", fetchCustomers);

export default customerRouter;
