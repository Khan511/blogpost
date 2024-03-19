import { Link } from "react-router-dom";
import { storage } from "../../firebase";
import "react-toastify/dist/ReactToastify.css";
import "react-circular-progressbar/dist/styles.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { CircularProgressbar } from "react-circular-progressbar";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  updateFailure,
  updateStart,
  updateSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutSuccess,
} from "../../redux/user/UserSlice";

const DashProfile = () => {
  const dispatch = useDispatch();
  const filePickerRef = useRef();
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const { currentUser, loading } = useSelector((state) => state.user);
  const [uploadStatus, setUploadStatus] = useState({
    progress: null,
    error: null,
    rul: null,
  });

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  useEffect(() => {
    if (imageFile) {
      setUploadStatus((prevStatus) => ({ ...prevStatus, error: null }));
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = () => {
    setImageUpload(true);
    const fileName = new Date().getTime() + imageFile?.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadStatus((prevStatus) => ({
          ...prevStatus,
          progress: progress.toFixed(0),
          error: null,
        }));
      },
      (error) => {
        setUploadStatus((prevStatus) => ({
          ...prevStatus,
          progress: null,
          error: "Could not upload image. (File must be less than 2MB.)",
        }));
        setImageFile(null);
        setImageUpload(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploadStatus((prevStatus) => ({
            ...prevStatus,
            url: downloadURL,
            progress: 100,
          }));
          setFormData((prevData) => ({
            ...prevData,
            profilePicture: downloadURL,
          }));
          setImageUpload(false);
        });
      },
    );
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      toast.error("Please fill all the fields");
      return;
    }

    if (
      formData.password === "" ||
      formData.email === "" ||
      formData.username === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    if (imageUpload) return;

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        if (res.status === 500) {
          toast.error("User with this username or email already exists.");
        } else {
          toast.error(data.message);
        }
      } else {
        dispatch(updateSuccess(data));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      if (res.status === 500) {
        toast.error("User with this username or email already exists.");
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleDeleteAccount = async () => {
    setShowModal(false);

    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
        toast.error(data.message);
      } else {
        dispatch(deleteUserSuccess());
        toast.success("Account deleted successfully");
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg  p-3 shadow-md">
      <h1 className="my-7 text-center text-4xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleUploadImage}
          className="rounded-full"
          ref={filePickerRef}
        />
        <div
          className="relative mb-10 h-32 w-32 cursor-pointer self-center overflow-hidden rounded-full shadow-md"
          onClick={() => filePickerRef.current.click()}
        >
          {uploadStatus.progress && !uploadStatus.error && (
            <CircularProgressbar
              value={uploadStatus.progress || 0}
              text={`${uploadStatus.progress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${uploadStatus.progress / 100})`,
                },
              }}
            />
          )}
          <img
            src={uploadStatus.url || currentUser.profilePicture}
            alt="Profile Picture"
            className={`h-full w-full rounded-full border-8 border-[lightgray] object-cover ${uploadStatus.progress && uploadStatus.progress < 100 && "opacity-60"}`}
          />
        </div>
        {uploadStatus.error && (
          <Alert color="failure">{uploadStatus.error}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username..."
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email..."
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Password..."
          onChange={handleChange}
        />
        <Button className="" type="submit" disabled={imageUpload || loading}>
          {loading ? "Loading..." : "Update"}
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              type="button"
              gradientDuoTone="purpleToPink"
              className="w-full"
            >
              Create a Post
            </Button>
          </Link>
        )}
      </form>
      <div className="mt-4 flex justify-between text-red-600">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span className="cursor-pointer" onClick={handleSignOut}>
          Sing Out
        </span>
      </div>
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
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-between">
              <Button
                color="failure"
                className="mr-3"
                onClick={handleDeleteAccount}
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
      <ToastContainer />
    </div>
  );
};

export default DashProfile;
