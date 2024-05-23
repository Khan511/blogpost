import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

const Comment = React.memo(({ comment, setComments }) => {
  console.log(comment);
  const { userId } = comment;
  const [user, setUser] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const [commentWarning, setCommentWarning] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const getUser = useCallback(
    async (signal) => {
      try {
        const res = await fetch(`/api/user/${userId}`);

        if (!res.ok) {
          const errorData = await res.json();
          console.log(errorData.message);
        }

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [userId],
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getUser(signal);

    return () => {
      controller.abort();
    };
  }, [getUser]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        setShowComment(true);
        setCommentWarning("You need to be logged in to like/dislike comment.");
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });

      if (!res.ok) {
        const errordata = await res.message;
        console.log(errordata);
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setComments((prevComments) =>
          prevComments.map((com) =>
            com._id === commentId
              ? { ...com, likes: data.likes, numberOfLikes: data.numberOfLikes }
              : com,
          ),
        );
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-b pt-3 text-sm dark:border-gray-600">
      {user && (
        <div className="flex  gap-2">
          <div className="my-2 flex shrink-0">
            <img
              className="h-12 w-12 rounded-full"
              src={user.profilePicture}
              alt={user.username}
            />
          </div>
          <div>
            <div className="my-2 flex flex-1 gap-1">
              <span className="mr-1 truncate text-xs font-bold">
                {user ? `@${user.username}` : "anonymous user"}
              </span>
              <span className="text-xs text-gray-500">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
            <p className="mb-2 text-gray-500">{comment.content}</p>
            <div>
              <div className="mt-6 flex max-w-fit gap-2 border-t py-2 dark:border-gray-700">
                <button
                  type="button"
                  className={`${currentUser && comment.likes.includes(currentUser._id) && "text-blue-500"} `}
                >
                  <FaThumbsUp onClick={() => handleLike(comment._id)} />
                </button>

                <p className=" text-gray-500">
                  {comment.likes.length}{" "}
                  {comment.likes.length > 1 ? "likes" : "like"}
                </p>
              </div>
              <p className="text-xs text-yellow-200 ">
                {showComment && commentWarning}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default Comment;
