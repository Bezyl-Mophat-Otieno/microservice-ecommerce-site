import DB from "../database/dbHelper.js";
import { v4 } from "uuid";
import bcrypt from "bcryptjs";

const regsisterCustomer = async (req, res) => {
  const id = v4();

  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword)
      return res.status(400).json({ msg: "Please fill all fields" });

    if (password !== confirmPassword)
      return res.status(400).json({ msg: "Password do not match" });

    const hashedPassoword = await bcrypt.hash(password, 10);

    const payload = {
      id,
      username,
      password: hashedPassoword,
      email,
    };

    const result = await DB.execute("registerCustomer", { ...payload });
    console.log(result);

    if (result.rowsAffected[0] === 1)
      return res.status(201).json({ msg: "customer registered successfully" });
    if (result.rowsAffected[0] === 0)
      return res.status(400).json({ msg: "Email already exists" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export default regsisterCustomer;
