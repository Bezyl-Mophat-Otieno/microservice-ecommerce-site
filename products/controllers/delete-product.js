import DB from "../database/dbHelper.js";

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ msg: "Id not provided" });

    const result = await DB.execute("deleteProduct", { id });
    if (result.rowsAffected[0] === 1) {
      return res.status(200).json({ msg: "Product deleted Successfully" });
    } else {
      return res.status(404).json({ msg: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json("Something went wrong in the server");
  }
};

export default deleteProduct