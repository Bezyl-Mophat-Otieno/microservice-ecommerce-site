import DB from "../database/dbHelper.js";

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ msg: "Id not provided" });

    const result = await DB.execute("updateProduct", { id, ...req.body });
    if (result.rowsAffected[0] === 1) {
      return res.status(200).json({ msg: "Product Updated Successfully" });
    } else {
      return res.status(404).json({ msg: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json("Something went wrong in the server");
  }
};

export default updateProduct;
