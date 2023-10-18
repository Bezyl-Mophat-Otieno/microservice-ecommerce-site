import DB from "../database/dbHelper.js";

const fetchCustomers = async (req, res) => {
  try {
    const result = await DB.execute("fetchCustomers");
    if (result.recordset.length > 0) {
      const customers = result.recordset;
      return res.status(200).json({ customers });
    } else {
      return res.status(404).json({ msg: "No Customer found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

export default fetchCustomers;
