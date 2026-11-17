import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      throw new Error("ADMIN_USERNAME and ADMIN_PASSWORD must be set in server/.env");
    }

    await connectDB();

    const adminExists = await Admin.findOne({
      username: ADMIN_USERNAME,
    });

    if (adminExists) {
      console.log("Admin already exists.");
      process.exit();
    }

    await Admin.create({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    });

    console.log("Admin created successfully.");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();