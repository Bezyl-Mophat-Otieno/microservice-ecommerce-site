import DB from "../database/dbHelper.js";
import { v4 } from "uuid";

const createOrder = async (req, res) => {
  try {
    const id = v4();
    const { customer_id, product_id, quantity } = req.body;
    const payload = {
      id,
      customer_id,
      product_id,
      quantity,
    };
    if (!customer_id || !product_id || !quantity)
      return res.status(400).json({ msg: "Kindly provide all fields" });
    const result = await DB.execute("createOrder", { ...payload });
    if (result.rowsAffected[0] === 1)
      return res.status(200).json({ msg: "Order created successfully" });
    else return res.status(404).json({ msg: "Order creation failed" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default createOrder;
