import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";
import uploadRoutes from "./routes/upload.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.get("/", (req, res) => {
  res.json("Hello uwu");
});

app.use("/api/auth", authRoutes);

app.use("/api/posts", postsRoutes);

app.use("/api/users", usersRoutes);

app.use("/api/upload", uploadRoutes);

app.listen(port, () => {
  console.log("Server running on port: ", port);
});
