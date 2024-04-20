import cloudinary from "../utils/cloudinary.js";

export const upload = async (req, res) => {
  try {
    const data = await cloudinary.uploader.upload(req.file.path);
    console.log(req.file.path);
    res.status(200).json(data.secure_url);
  } catch (err) {
    res.status(500).json(err);
  }
};
