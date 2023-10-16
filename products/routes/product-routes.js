import { Router } from "express";
import addProduct from "../controllers/add-product.js";
import getProduct from "../controllers/get-product.js";
import updateProduct from "../controllers/update-product.js";
import deleteProduct from "../controllers/delete-product.js";
import fetchProducts from "../controllers/fetch-products.js";

const productRouter = new Router();

productRouter.post("/add", addProduct);
productRouter.get("/get/:id", getProduct);
productRouter.put("/update/:id", updateProduct);
productRouter.delete("/delete/:id", deleteProduct);
productRouter.get("/fetch", fetchProducts);

export default productRouter;
