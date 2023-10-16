import DB from "../database/dbHelper.js";

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ msg: "Kindly provide the product id" });

    const result = await DB.execute("getProduct", { id });
    if (result.recordset.length > 0) {
      const product = result.recordset[0];
      res.status(200).json({ product: product });
    } else {
      res.status(404).json({ msg: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

export default getProduct;
