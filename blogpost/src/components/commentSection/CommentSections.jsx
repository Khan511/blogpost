import { Alert, Button, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShowComments from "./ShowComments";

const CommentSections = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setCommentError(errorData.message);
        return;
      }

      const data = await res.json();

      if (res.ok) {
        setComment("");
        setCommentError(null);
      }
    } catch (error) {
      console.log(error);
      setCommentError(null);
    }
  };

  return (
    <div className=" mx-auto max-w-2xl  ">
      {currentUser ? (
        <div className="my-6 flex items-center justify-center gap-2 text-xs text-gray-500">
          <p>Signed in as: </p>
          <img
            src={currentUser.profilePicture}
            alt=""
            className="8-5 w-8 rounded-full object-cover"
          />
          <Link to="/dashboard?tab=profile" className="text-cyan-600 underline">
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex gap-1 py-2 text-xs text-teal-500">
          You must be logged in to comment
          <Link to="/sign-in" className="text-blue-500  hover:underline">
            Login
          </Link>
        </div>
      )}

      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-teal-500 p-5"
        >
          <Textarea
            placeholder="Add a comment..."
            rows={3}
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="my-4 flex flex-col justify-between sm:flex-row">
            <p className="pb-1 text-xs text-gray-400">
              {200 - comment.length} characters reamaining
            </p>
            <Button onClick={handleSubmit} outline>
              Add Comment
            </Button>
          </div>
          {commentError && <Alert color={"failure"}>{commentError}</Alert>}
        </form>
      )}
      <ShowComments />
    </div>
  );
};

export default CommentSections;
