import { error_response, success_response } from "../lib/utils.js";
import prisma from "../PrismaClient.js";

// TODO: pending to add pagination

// follow following user
export const followUser = async (req, res) => {
  try {
    const { otherUserId } = req.params;
    if (!otherUserId) {
      error_response(res, "Please provide otherUserId");
    }
    const isFollowed = await prisma.userfollow.findUnique({
      where: {
        userId_otherUserId: {
          userId: req.user.id,
          otherUserId: otherUserId,
        },
      },
      select: {
        id: true,
      },
    });

    if (!isFollowed) {
      const followed = await prisma.userfollow.create({
        data: {
          userId: req.user.id,
          otherUserId,
          createdAt: new Date(),
        },
      });
      success_response(res, "You have followed successfully");
    } else {
      const deleteRecord = await prisma.userfollow.delete({
        where: {
          id: isFollowed.id, // This should work if isFollowed is correctly returned
        },
      });

      success_response(res, "You have unfollowed successfully");
    }
  } catch (error) {
    error_response(res, error.message);
  }
};

export const followFollowingFriendCount = async (req, res) => {
  try {
    const followingCount = await prisma.userfollow.count({
      where: {
        userId: req.user.id,
      },
    });

    const followerCount = await prisma.userfollow.count({
      where: {
        otherUserId: req.user.id,
      },
    });
    const friendCount = await prisma.userfollow.findMany({});
    const result = await Promise.all(
      friendCount.map(async (user) => {
        const fcount = await prisma.userfollow.count({
          where: {
            AND: [
              {
                userId: req.user.id,
                otherUserId: user.otherUserId,
              },
              {
                userId: user.otherUserId,
                otherUserId: req.user.id,
              },
            ],
          },
        });
        return fcount;
      })
    );
    const totalfriends = await result.reduce((acc, total) => {
      return +acc + +total;
    }, 0);
    success_response(res, "User count fetched", {
      followingCount,
      followerCount,
      friendCount: totalfriends,
    });
  } catch (error) {
    error_response(res, error.message);
  }
};

export const followFollowingFriendCountDetails = async (req, res) => {
  try {
    const followingCount = await prisma.userfollow.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        OtherUserId: {
          select: {
            image: true,
            name: true,
            id: true,
          },
        },
      },
    });

    const followerCount = await prisma.userfollow.findMany({
      where: {
        otherUserId: req.user.id,
      },
    });
    const friendCount = await prisma.userfollow.findMany({
      where: {
        userId: req.user.id,
      },
    });
    const result = await Promise.all(
      friendCount.map(async (user) => {
        // Check if the other user follows back
        const fcount = await prisma.userfollow.findFirst({
          where: {
            userId: user.otherUserId, // The other user
            otherUserId: req.user.id, // Following the current user
          },
        });

        return { friends: fcount && fcount }; // If found, they follow back (mutual), otherwise not
      })
    );
    return res.send({
      followingDetails: followingCount,
      followerDetails: followerCount,
      friendsDetials: result,
    });
  } catch (error) {
    error_response(res, error.message);
  }
};
