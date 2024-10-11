import {
  deleting_image,
  error_response,
  success_response,
} from "../lib/utils.js";
import prisma from "../PrismaClient.js";

// Create post
export const createPost = async (req, res) => {
  const imagePath = req.file ? `/post/images/${req.file.filename}` : "";
  const filePath = req.file ? `uploads/post/images/${req.file.filename}` : null;
  try {
    const { title, description, tags } = req.body;

    if (!title || !description || !tags) {
      error_response(res, "Please enter required fields");
    }

    if (!req.user) {
      deleting_image(filePath);
      error_response(res, "Unauthorized..."); // Check if user exists
    }
    const parsedTag = JSON.parse(tags);

    const details = {
      title,
      description,
      tags: parsedTag,
      userId: req.user.id,
      image: imagePath,
    };

    const newPost = await prisma.post.create({
      data: details,
    });

    return res.send({
      success: 1,
      message: "Post created successfully",
      details: [],
    });
    // success_response(res, "Post created successfully");
  } catch (error) {
    deleting_image(filePath);
    return res.send({
      success: 0,
      message: error.message,
    });
    // error_response(res, error.message);
  }
};

// Get All Posts
export const getAllPosts = async (req, res) => {
  try {
    if (!req.user) {
      return res.send({
        success: 0,
        message: "Unauthorized...",
      });
    }
    const posts = await prisma.post.findMany({
      include: {
        User: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });
    success_response(res, "Posts fetched successfully...", posts);
  } catch (error) {
    error_response(res, error.message);
  }
};
