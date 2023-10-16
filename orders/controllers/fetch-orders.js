import DB from "../database/dbHelper.js";

const fetchOrders = async (req, res) => {
  try {
    const result = await DB.execute("fetchOrders");
    if (result.rowsAffected[0] > 0) {
      return res.status(200).json({ orders: result.recordset });
    } else {
      return res.status(404).json({ message: "Orders not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default fetchOrders;