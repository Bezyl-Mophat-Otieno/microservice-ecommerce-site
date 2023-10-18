import DB from "../database/dbHelper.js";
import { v4 } from "uuid";

const addProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    if (!name || !description || !price || !quantity)
      return res
        .status(400)
        .json({ msg: "Kindly provide all the necessary fields" });

    const id = v4();

    const payload = {
      id,
      name,
      description,
      price,
      quantity,
    };

    const result = await DB.execute("addProduct", { ...payload });

    if (result.rowsAffected[0] === 1)
      return res.status(201).json({ msg: "Product Added successfully" });

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({
        msg: "Something went wrong, Product was not added successfully",
      });
  } catch (error) {
    
    return res.status(500).json({ message: error.message });
  }
};

export default addProduct;
