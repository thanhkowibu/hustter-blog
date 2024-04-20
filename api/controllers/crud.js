import db from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const { category } = req.query;
  const q = `SELECT * FROM posts ${
    category ? "WHERE category = $1" : ""
  } ORDER BY date DESC`;
  try {
    const data = await db.query(q, category ? [category] : []);
    res.status(200).json(data.rows);
  } catch (err) {
    res.json(err);
  }
};

export const getaPost = async (req, res) => {
  const { id } = req.params;
  const q = `SELECT posts.id AS post_id, title, description, posts.img AS posts_img, date, category, uid, username, users.img AS users_img FROM posts 
    JOIN users ON posts.uid = users.id
    WHERE posts.id = $1`;
  try {
    const data = await db.query(q, [id]);
    const { password, ...otherInformation } = data.rows[0];
    res.status(200).json(otherInformation);
  } catch (err) {
    res.json(err);
  }

  // console.log(req.params);
  // res.json("Get a post");
};

export const getRelatedPosts = async (req, res) => {
  const { id } = req.params;
  const { category } = req.query;
  const q = `SELECT * FROM posts
  WHERE id != $1
  ORDER BY CASE WHEN category = $2 THEN 0 ELSE 1 END, category`;

  try {
    const data = await db.query(q, [id, category]);
    res.status(200).json(data.rows);
  } catch (err) {
    res.json(err);
  }
};

export const addPost = async (req, res) => {
  const q = `INSERT INTO posts (title, description, category, img, date, uid)
  VALUES ($1, $2, $3, $4, $5, $6)`;
  const userInfo = req.user;
  const { title, description, category, img, date } = req.body;
  const values = [title, description, category, img, date, userInfo.id];
  // console.log(values);
  try {
    await db.query(q, values);
    res.status(200).json("Posted successfully");
  } catch (err) {
    res.json(err);
  }

  // res.json("Add post");
};

export const deletePost = async (req, res) => {
  let q;
  try {
    const userInfo = req.user;
    const { id } = req.params;

    q = `SELECT uid FROM posts WHERE id = $1`;
    const data = await db.query(q, [id]);
    if (data.rows.length === 0 || data.rows[0].uid != userInfo.id)
      return res.status(403).json("You are not authorized");

    q = `DELETE FROM posts WHERE id = $1 AND uid = $2`;
    await db.query(q, [id, userInfo.id]);
    return res.status(200).json("Deleted successfully");

    // db.query(q, [id, userInfo.id], (err, data) => {
    //   if (err) return res.status(403).json("You are not authorized");

    //   return res.json("Deleted successfully");
    // });
  } catch (err) {
    return res.status(403).json("Token is not valid");
  }
};

export const updatePost = async (req, res) => {
  let q;
  try {
    const userInfo = req.user;
    const { id } = req.params;
    // console.log(id);

    q = `SELECT uid FROM posts WHERE id = $1`;
    const data = await db.query(q, [id]);
    if (data.rows.length === 0 || data.rows[0].uid != userInfo.id)
      return res.status(403).json("You are not authorized");

    q = `UPDATE posts 
          SET title = $1, description = $2, category = $3, img = $4, date = $5
          WHERE id = $6 AND uid = $7`;
    const { title, description, category, img, date } = req.body;
    const values = [title, description, category, img, date, id, userInfo.id];
    await db.query(q, values);
    return res.status(200).json("Updated successfully");
  } catch (err) {
    return res.status(403).json("Token is not valid");
  }
};
