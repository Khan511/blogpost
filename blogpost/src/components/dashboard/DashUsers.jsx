import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { FaCheck, FaTimes } from "react-icons/fa";

// 07:15
const DashUsers = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const getUsers = async () => {
    try {
      const res = await fetch(`/api/user/getusers`);
      const data = await res.json();

      if (!res.ok) {
        console.log("Giving error");
      }
      if (res.ok) {
        setUsers(data.users);

        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;

    try {
      const res = await fetch(`/api/user/getUsers?startIndex=${startIndex}`);

      const data = await res.json();

      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300  dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 md:mx-auto">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>UserName</Table.HeadCell>
              <Table.HeadCell>UserEmail</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body className="divide-y" key={user._id}>
                  <Table.Row className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="h-12 w-12 rounded-full bg-gray-500 object-cover"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      {user.isAdmin ? (
                        <FaCheck className="text-xl text-green-500" />
                      ) : (
                        <FaTimes className="text-xl text-red-500" />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        className="cursor-pointer font-medium text-red-500 hover:underline"
                        onClick={() => {
                          setShowModal(true);
                          setUserIdToDelete(user._id);
                        }}
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full self-center py-7 text-teal-500 "
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <div>
          <h1>There are no user!</h1>
        </div>
      )}
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
                Are you sure you want to delete this user?
              </h3>
              <div className="flex justify-between">
                <Button
                  color="failure"
                  className="mr-3"
                  onClick={handleDeleteUser}
                >
                  Yes, I'm sure
                </Button>
                <Button className="px-7" onClick={() => setShowModal(false)}>
                  No
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};
export default DashUsers;
