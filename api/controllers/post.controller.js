import Post from "../models/post.model.js";
import { ErrorHandler } from "../utils/Error.js";
// import create from "./post.controller";

const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(ErrorHandler(403, "You are not allowed to create a post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(ErrorHandler(400, "Please provide all required fields"));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.log(error);

    next(error);
    console.log(error);
  }
};

export default create;

export const getPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    // const posts = await Post.find(
    //   ...(req.query.userId && { userId: req.query.userId }),
    //   ...(req.query.category && { category: req.query.category }),
    //   ...(req.query.slug && { category: req.query.slug }),
    //   ...(req.query.postId && { _id: req.query.postId }),
    //   ...(req.query.searchTerm && {
    //     $or: [
    //       { title: { $regex: req.query.searchTerm, $options: "i" } },
    //       { content: { $regex: req.query.searchTerm, $options: "i" } },
    //     ],
    //   })
    // )
    let query = {};

    if (req.query.userId) query.userId = req.query.userId;
    if (req.query.category) query.category = req.query.category;
    if (req.query.slug) query.slug = req.query.slug; // Adjusted to `slug` instead of `category` for the slug condition
    if (req.query.postId) query._id = req.query.postId;
    if (req.query.searchTerm) {
      query.$or = [
        { title: { $regex: req.query.searchTerm, $options: "i" } },
        { content: { $regex: req.query.searchTerm, $options: "i" } },
      ];
    }
    const posts = await Post.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMothAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMothAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    console.log("Error is: " + error.message);
    next(error);
  }
};
