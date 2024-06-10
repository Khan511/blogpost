import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CgArrowUp } from "react-icons/cg";
import { PiUsersThreeLight } from "react-icons/pi";
import { LiaComment } from "react-icons/lia";
import { LuFileText } from "react-icons/lu";
import {
  Button,
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Link } from "react-router-dom";

const DashBoardComponente = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  const { currentUser } = useSelector((state) => state.user);

  const fetchUsers = async (signal) => {
    try {
      const res = await fetch("/api/user/getusers?limit=5", signal);

      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData);
      }

      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
        setLastMonthUsers(data.lastMonthUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPosts = async (signal) => {
    try {
      const res = await fetch("/api/post/getposts?limit=5", signal);

      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData);
      }

      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setTotalPosts(data.totalPosts);
        setLastMonthPosts(data.lastMonthPosts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCommentss = async (signal) => {
    try {
      const res = await fetch("/api/comment/getcomments?limit=5", signal);

      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData);
      }

      if (res.ok) {
        const data = await res.json();
        setComments(data.comments);
        setLastMonthComments(data.lastMonthComments);
        setTotalComments(data.totalComments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (currentUser.isAdmin) {
      fetchUsers(signal);
      fetchPosts(signal);
      fetchCommentss(signal);
    }

    return () => {
      controller.abort();
    };
  }, [currentUser]);

  console.log(users);

  return (
    <div className="w-full">
      <div className="mx-auto mt-4 flex max-w-4xl flex-col flex-wrap justify-center gap-2 md:flex-row">
        <div className="flex w-full flex-col rounded-lg p-2 shadow-xl dark:border md:w-72">
          <div className="flex flex-row justify-between">
            <div className="mb-4">
              <p>TOTAL USERS</p>
              <p>{totalUsers}</p>
            </div>
            <div className=" flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 font-bold text-white">
              <span>
                <PiUsersThreeLight />
              </span>
            </div>
          </div>
          <div className="flex items-center  gap-2">
            <p className=" flex items-center text-lg font-bold text-green-500">
              <CgArrowUp /> <span>{lastMonthUsers}</span>
            </p>
            <span>Last month</span>
          </div>
        </div>
        <div className="flex w-full flex-col rounded-lg p-2 shadow-xl dark:border md:w-72">
          <div className="flex flex-row justify-between">
            <div className="mb-4">
              <p>TOTAL COMMENTS</p>
              <p>{totalComments}</p>
            </div>
            <div className=" flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
              <LiaComment />
            </div>
          </div>
          <div className="flex items-center  gap-2">
            <p className=" flex items-center text-lg font-bold text-green-500">
              <CgArrowUp /> <span>{lastMonthComments}</span>
            </p>
            <span>Last month</span>
          </div>
        </div>
        <div className="flex w-full flex-col rounded-lg p-2 shadow-xl dark:border md:w-72">
          <div className="flex flex-row justify-between">
            <div className="mb-4">
              <p>TOTAL POSTS</p>
              <p>{totalPosts}</p>
            </div>
            <div className=" flex h-8 w-8 items-center justify-center rounded-full bg-green-500 font-bold text-white">
              <LuFileText />
            </div>
          </div>
          <div className="flex items-center  gap-2">
            <p className=" flex items-center text-lg font-bold text-green-500">
              <CgArrowUp /> <span>{lastMonthPosts}</span>
            </p>
            <span>Last month</span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex   flex-wrap justify-center gap-3 md:flex-row">
        <div className="flex w-full  flex-col rounded-md py-6 shadow-xl dark:border md:w-80">
          <div className="flex items-end justify-between p-2">
            <p>Recent Users</p>
            <Link to="http://localhost:5173/dashboard?tab=users">
              <Button outline>Seel All</Button>
            </Link>
          </div>
          <div>
            <Table>
              <Table.Head>
                <Table.HeadCell>USER IAMGE</Table.HeadCell>
                <Table.HeadCell>USERNAME</Table.HeadCell>
              </Table.Head>
              {users &&
                users.map((user) => {
                  return (
                    <Table.Body>
                      <Table.Row className="shadow-sm dark:border dark:border-gray-700">
                        <Table.Cell>
                          <img
                            src={user.profilePicture}
                            alt=""
                            className="h-10 w-10 rounded-full"
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <p>{user.username}</p>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  );
                })}
            </Table>
          </div>
        </div>
        <div className="flex w-full flex-col rounded-md py-6  shadow-xl dark:border md:w-80">
          <div className="flex items-end justify-between p-2">
            <p>Recent Comments</p>
            <Link to="http://localhost:5173/dashboard?tab=comments">
              <Button outline>Seel All</Button>
            </Link>
          </div>
          <Table>
            <Table.Head>
              <Table.HeadCell>COMMENT CONTENT</Table.HeadCell>
              <Table.HeadCell>LIKES</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => {
                return (
                  <Table.Body>
                    <Table.Row className="shadow-sm dark:border dark:border-gray-700">
                      <Table.Cell>
                        <p>{comment.content}</p>
                      </Table.Cell>
                      <Table.Cell>
                        <p>{comment.numberOfLikes}</p>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                );
              })}
          </Table>
        </div>
        <div className="flex w-full flex-col rounded-md py-6  shadow-xl dark:border md:w-80">
          <div className="flex items-end justify-between p-2">
            <p>Recent Posts</p>
            <Link to="http://localhost:5173/dashboard?tab=posts">
              <Button outline>Seel All</Button>
            </Link>
          </div>
          <Table>
            <Table.Head>
              <Table.HeadCell>POST IMAGE</Table.HeadCell>
              <Table.HeadCell>POST TITLE</Table.HeadCell>
              <Table.HeadCell>CATEGORY</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => {
                return (
                  <Table.Body>
                    <Table.Row className="shadow-sm dark:border dark:border-gray-700">
                      <Table.Cell>
                        <img
                          className="h-9 w-9 rounded-full"
                          src={post.image}
                          alt=""
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <p>{post.title.slice(0, 30)}</p>
                      </Table.Cell>
                      <Table.Cell>
                        <p>{post.category}</p>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                );
              })}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DashBoardComponente;
