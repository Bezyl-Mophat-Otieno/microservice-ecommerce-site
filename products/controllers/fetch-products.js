import DB from "../database/dbHelper.js";

const fetchProducts = async (req, res) => {
  try {
    const result = await DB.execute("fetchProducts");
    if (result.recordset.length > 0) {
      const products = result.recordset;
      return res.status(200).json({ products });
    } else {
      return res.status(404).json({ msg: "No products found" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

export default fetchProducts;
