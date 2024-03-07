import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { storage } from "../../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// 04:41:00
const DashProfile = () => {
  const filePickerRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  // const [imageFileUrl, setImageFileUrl] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  // const [imageFileUploadError, setImageFileUploadFileError] = useState(null);
  // const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [uploadStatus, setUploadStatus] = useState({
    progress: null,
    error: null,
    rul: null,
  });

  //  04:33:18
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      setUploadStatus((prevStatus) => ({ ...prevStatus, error: null }));
      // setImageFileUploadFileError(null);
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = () => {
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
        // setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setUploadStatus((prevStatus) => ({
          ...prevStatus,
          progress: null,
          error: "Could not upload image. (File must be less than 2MB.)",
          // url: null,
        }));
        setImageFile(null);
        // setImageFileUploadProgress(null);
        // setImageFileUploadFileError(
        //   "Could not upload image(File must be less than 2MB.",
        // );
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploadStatus((prevStatus) => ({
            ...prevStatus,
            url: downloadURL,
            progress: 100,
          }));
          // setImageFileUrl(downloadURL);
        });
      },
    );
  };

  // console.log(imageFileUploadError);

  return (
    <div className="mx-auto w-full max-w-lg  p-3 shadow-md">
      <h1 className="my-7 text-center text-4xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-5">
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
          {/* {imageFileUploadProgress && !imageFileUploadError && ( */}
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
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email..."
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="Password..." />
        <Button className="" type="submit">
          Update
        </Button>
      </form>
      <div className="mt-4 flex justify-between text-red-600">
        <span className="cursor-pointer">Delete Account</span>

        <span className="cursor-pointer">Sing Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
