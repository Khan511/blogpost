import { useEffect, useMemo, useState } from "react";
import Comment from "../dashboard/comment/Comment";

const ShowComments = ({ comments, setComments }) => {
  // console.log(handleLike);
  if (comments.length === 0) {
    return <p>There are no comments yes!</p>;
  }
  return (
    <>
      <div className="mt-4 flex items-center gap-2">
        <div className="my-3 flex gap-2">
          <p>Comments</p>
          <p className="rounded-md border border-gray-500 px-2 text-center  text-sm">
            {comments.length}
          </p>
        </div>
      </div>
      <div className="">
        {comments &&
          comments.map((comment) => {
            return (
              <Comment
                key={comment._id}
                comment={comment}
                setComments={setComments}
                comments={comments}
              />
            );
          })}
      </div>
    </>
  );
};

export default ShowComments;
