import { Button, Modal, Textarea } from "flowbite-react";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Comment = React.memo(({ comment, setComments }) => {
  console.log(comment);
  const { userId } = comment;
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentWarning, setCommentWarning] = useState(null);
  const [editedContent, setEditedContent] = useState(comment.content);
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

  const handleEditting = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleDeletComment = async (commentId) => {
    setShowModal(false);

    try {
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData);
      }
      if (res.ok) {
        const data = await res.json();
        setComments((prevComments) =>
          prevComments.filter((com) => com._id !== commentId),
        );
      }

      await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveComment = async (commentId) => {
    try {
      const res = await fetch(`/api/comment/editComment/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedContent }),
      });

      if (!res.ok) {
        const errorData = await res.message;
        console.log(errorData);
      }
      if (res.ok) {
        setIsEditing(false);
        setComments((prevComments) =>
          prevComments.map((com) =>
            com._id === commentId ? { ...com, content: editedContent } : com,
          ),
        );
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
          <div className="w-full">
            <div className="my-2 flex flex-1 gap-1">
              <span className="mr-1 truncate text-xs font-bold">
                {user ? `@${user.username}` : "anonymous user"}
              </span>
              <span className="text-xs text-gray-500">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
            {isEditing ? (
              <>
                <Textarea
                  className="mb-2"
                  row="3"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />

                <div className=" mb-2 flex w-full justify-end gap-2">
                  <Button
                    className=""
                    outline
                    type="button"
                    size="sm"
                    onClick={() => handleSaveComment(comment._id)}
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    outline
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
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
                    {currentUser &&
                      (currentUser._id === comment.userId ||
                        currentUser.isAdmin) && (
                        <>
                          <button
                            className="text-gray-500 hover:text-blue-500"
                            onClick={handleEditting}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-400 hover:text-red-700"
                            onClick={(e) => setShowModal(true)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                  </div>

                  <p className="text-xs text-yellow-200 ">
                    {showComment && commentWarning}
                  </p>
                </div>
              </>
            )}
          </div>
          {showModal && (
            <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              popup
              size="md"
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-3 text-5xl text-red-600" />
                  <h3 className="mb-8 text-xl">
                    Are you sure you want to delete this comment?
                  </h3>
                  <div className="flex justify-between">
                    <Button
                      color="failure"
                      className="mr-3"
                      onClick={() => handleDeletComment(comment._id)}
                    >
                      Yes, I'm sure
                    </Button>
                    <Button
                      className="px-7"
                      onClick={() => setShowModal(false)}
                    >
                      No
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
});

export default Comment;
