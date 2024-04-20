import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  // CHECK IF USER EXIST
  let q = `SELECT * FROM users WHERE username = $1 OR email = $2`;
  try {
    const data = await db.query(q, [req.body.username, req.body.email]);
    if (data.rows.length)
      return res.status(409).json("User or email already exists");

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    q = `INSERT INTO users (username, email, password) 
              VALUES ($1,$2,$3)`;
    await db.query(q, [req.body.username, req.body.email, hashedPassword]);
    res.status(200).json("User has been successfully created");
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

export const login = async (req, res) => {
  let q = `SELECT * FROM users WHERE username = $1 OR email = $1`;
  try {
    const data = await db.query(q, [req.body.username]);

    if (data.rows.length === 0)
      return res.status(404).json("Username or email not found");

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      data.rows[0].password
    );
    if (!isPasswordCorrect) return res.status(400).json("Password incorrect");

    const token = jwt.sign({ id: data.rows[0].id }, process.env.JWT_KEY);
    const { password, ...otherInformation } = data.rows[0]; // Exclude password from data to pass to json

    return res.cookie("access_token", token).status(200).json(otherInformation);

    // return res.status(200).json("Login successfully");
  } catch (err) {
    res.json(err);
    console.log(err);
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      samesite: "none",
      secure: true,
    })
    .status(200)
    .json("Logged out successfully");
};
