import DB from "../database/dbHelper.js";

const myOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await DB.execute("getMyOrders", { customer_id: id });
    if (result.rowsAffected[0] > 0) {
      return res.status(200).json({ orders: result.recordset });
    } else {
      return res.status(404).json({ message: "Orders not found" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default myOrders;
