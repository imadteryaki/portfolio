import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    imagePublicId: {
      type: String,
      default: "",
    },

    technologies: [
      {
        type: String,
      },
    ],

    github: {
      type: String,
      required: true,
    },

    liveDemo: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["planned", "in-development", "completed"],
      default: "planned",
      required: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Project", projectSchema);