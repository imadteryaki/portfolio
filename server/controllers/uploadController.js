import fs from "fs/promises";
import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded.",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "portfolio/projects",
      resource_type: "image",
    });

    await fs.unlink(req.file.path).catch(() => {});

    return res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => {});
    }

    console.error("Cloudinary upload error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Image upload failed.",
    });
  }
};