import db from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const q = "SELECT * FROM users";
    const data = await db.query(q);
    res.json(data.rows);
    console.log(data);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// export const getUsers = (req, res) => res.json("GET users");
