import { ErrorHandler } from "../utils/Error.js";
import Comment from "../models/comment.model.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(
        ErrorHandler(403, "You are not allowed to create this comment")
      );
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });

    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });

    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    //  Find the comment by its ID provided in the request parameters
    const comment = await Comment.findById(req.params.commentId);

    // If the comment does not exist, pass an error to the next middleware
    if (!comment) {
      return next(ErrorHandler(404, "Comment not found"));
    }

    // Find the index of the user ID in the likes array of the comment
    const userIndex = comment.likes.indexOf(req.user.id);

    // If the user ID is not in the likes array, increment the number of likes and add the user ID to the likes array
    if (userIndex == -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    }
    // If the user ID is already in the likes array, decrement the number of likes and remove the user ID from the likes array
    else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }

    // Save the updated comment document
    await comment.save();

    // Send a success response with the updated comment
    res.status(200).json(comment);
  } catch (error) {
    // If any error occurs, pass it to the next middleware
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return next(ErrorHandler(404, "Commnet not found"));
    }

    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        ErrorHandler(403, "You are not allowed to edit this comment.")
      );
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );

    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return next(ErrorHandler(404, "Comment not found"));
    }

    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        ErrorHandler(403, "You are not allowed to delete this comment")
      );
    }

    await Comment.findByIdAndDelete(req.params.commentId);

    res.status(200).json("Comment has been deleted.");
  } catch (error) {}
};
