import DB from "../database/dbHelper.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password)
      return res
        .status(400)
        .json({ msg: "Kindly provide all the login credentials" });
    const payload = {
      email,
      password,
    };
    const result = await DB.execute("loginCustomer", { email });
    if (result.recordset.length > 0) {
      const customer = result.recordset[0];
      const isPasswordCorrect = await bcrypt.compare(
        password,
        customer.password
      );
      if (!isPasswordCorrect)
        return res.status(400).json({ msg: "Invalid login credentials" });
      const token = jwt.sign({ ...payload, password }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.status(200).json({ msg: "Login successful", token });
    } else {
      return res
        .status(400)
        .json({ msg: "Customer with the specific email does not exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export default loginCustomer;
