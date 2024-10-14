import { skip } from "@prisma/client/runtime/library";
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
// endPoint:/post/
// method:Get
// query  sort || filter
export const getAllPosts = async (req, res) => {
  try {
    // Destructure query parameters, with default values for page and limit
    let { sort = "asc", filter, page = 1, limit = 10 } = req.query;

    // Initialize query object
    let query = {};

    // If a filter is provided, apply it to the query
    if (filter) {
      query.tags = {
        has: filter, // Apply filter on tags if present
      };
    }

    // Fetch posts from the database using Prisma
    const posts = await prisma.post.findMany({
      where: {
        ...query,
      },
      include: {
        User: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: {
        title: sort, // Sort by title (default 'asc')
      },
      skip: (+page - 1) * +limit, // Pagination logic
      take: +limit, // Limit the number of posts returned
    });

    // Process posts to get the like count, with a fallback to 0
    const postsWithLikeCount = await Promise.all(
      posts.map(async (post) => {
        const likePost = await prisma.like.count({
          where: {
            id: post.id,
          },
        });
        return { ...post, likeCount: likePost || 0 };
      })
    );

    // Send success response with the fetched posts
    success_response(res, "Posts fetched successfully...", postsWithLikeCount);
  } catch (error) {
    // Send error response if something goes wrong
    error_response(res, error.message);
  }
};

// Get single post
// endPoint:/post/:postId
// method:Get
export const getSinglePost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      error_response(res, "Please enter post id.");
    }

    const findPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    const likePost = await prisma.like.count({
      where: {
        id: findPost.id,
      },
    });

    const details = { ...findPost, likeCount: likePost || 0 };

    success_response(res, "Post fetched successfully", details);
  } catch (error) {
    error_response(res, error.message);
  }
};

// Update post
// endPoint:/post/postId
// method:Patch
export const updatePost = async (req, res) => {
  const imagePath = req.file
    ? `uploads/post/images/${req.file.filename}`
    : null;
  const image = req.file && `/post/images/${req.file.filename}`;
  try {
    const { title, description } = req.body;
    const { postId } = req.params;
    if (!postId) {
      error_response(res, "Please provide post id.");
    }

    const updatePost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        description,
        image,
      },
    });
    deleting_image(imagePath);
    success_response(res, "Post update successfully");
  } catch (error) {
    error_response(res, error.message);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      error_response(res, "Please provide postId");
    }
    const findPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (findPost) {
      const imagePath = `uploads/${findPost.image}`;
      deleting_image(imagePath);
    }
    const deletePost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    success_response(res, "Post deleted successfully");
  } catch (error) {
    error_response(res, error.message);
  }
};
