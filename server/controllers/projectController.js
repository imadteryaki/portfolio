import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";

// GET /api/projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error.message,
    });
  }
};

// POST /api/projects
export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
};

// PUT /api/projects/:id
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const oldImagePublicId = project.imagePublicId;
    const newImagePublicId = req.body.imagePublicId || "";
    const imageChanged =
      newImagePublicId &&
      oldImagePublicId &&
      newImagePublicId !== oldImagePublicId;

    const imageRemoved =
      oldImagePublicId &&
      !req.body.image &&
      !newImagePublicId;

    project.title = req.body.title ?? project.title;
    project.description = req.body.description ?? project.description;
    project.image = req.body.image ?? project.image;
    project.imagePublicId =
      req.body.imagePublicId ?? project.imagePublicId;
    project.technologies =
      req.body.technologies ?? project.technologies;
    project.github = req.body.github ?? project.github;
    project.liveDemo = req.body.liveDemo ?? project.liveDemo;
    project.status = req.body.status ?? project.status;

    if (typeof req.body.featured === "boolean") {
      project.featured = req.body.featured;
    }

    await project.save();

    if (imageChanged || imageRemoved) {
      await cloudinary.uploader.destroy(oldImagePublicId);
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
    });
  }
};

// DELETE /api/projects/:id
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.imagePublicId) {
      await cloudinary.uploader.destroy(project.imagePublicId);
    }

    await project.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
};