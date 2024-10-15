import { error_response, success_response } from "../lib/utils.js";

// like the post
export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      error_response(res, "Please provide postId");
    }
    const isLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId: req.user.id,
        },
      },
    });
    if (isLike) {
      await prisma.like.delete({
        where: {
          id: isLike.id,
        },
      });
      success_response(res, "You have dislike the post");
    } else {
      await prisma.like.create({
        data: {
          postId,
          userId: req.user.id,
          createdAt: new Date(),
        },
      });
      success_response(res, "You Like the post");
    }
  } catch (error) {
    error_response(res, error.message);
  }
};
