import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// 07:02:29
export const DashPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const getPsots = async () => {
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
      const data = await res.json();

      if (!res.ok) {
        console.log("Giving error");
      }
      if (res.ok) {
        setUserPosts(data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser.isAdmin) {
      getPsots();
    }
  }, [currentUser._id]);
  console.log(userPosts);
  return (
    <div className="table-auto overflow-x-scroll p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300  dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 md:mx-auto">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date updated</Table.HeadCell>
            <Table.HeadCell>Post image</Table.HeadCell>
            <Table.HeadCell>Post title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          {userPosts &&
            userPosts.map((post) => (
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-10 w-20 bg-gray-500 object-cover"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/post/${post.slug}`}
                      className="font-semibold text-gray-900 dark:text-white"
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span className="cursor-pointer font-medium text-red-500 hover:underline">
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
        </Table>
      ) : (
        <div>
          <h1>There are no posts!</h1>
        </div>
      )}
    </div>
  );
};
