import moment from "moment";
import { useEffect, useState } from "react";

const Comment = ({ comment }) => {
  const { userId } = comment;
  const [user, setUser] = useState(null);

  const getUser = async () => {
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
  };

  useEffect(() => {
    getUser();
  }, [comment]);

  return (
    <div className="border-b pt-3 text-sm dark:border-gray-600">
      {user && (
        <div className="flex   items-center gap-2">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
