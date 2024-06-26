import { useState } from "react";
import ReactQuill from "react-quill";
import { storage } from "../firebase";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from "react-circular-progressbar";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";

const CreatePost = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploadProgess, setImageUploadProgress] = useState(null);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image.");
        return;
      }

      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadError(null);
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downlaodURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downlaodURL });
          });
        },
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong!");
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-3xl  p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            id="category"
            onClick={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="mt-6 flex flex-col justify-between gap-4 border-4 border-dotted border-green-200 p-3 sm:flex-row">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Button
            type="button"
            gradientDuoTone="perpleToBlue"
            size="sm"
            className="border border-gray-500 bg-gray-800 text-white  hover:bg-black"
            onClick={handleUploadImage}
          >
            {imageUploadProgess ? (
              <div className="h-12 w-12">
                <CircularProgressbar
                  value={imageUploadProgess || 0}
                  text={`${imageUploadProgess || 0}%`}
                  strokeWidth={10}
                  styles={{
                    root: {
                      width: "100%",
                      height: "100%",
                    },
                  }}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>

        {imageUploadError && <Alert color="failure">{imageUploadError} </Alert>}
        {formData.image && (
          <div className="mt-2 flex w-full justify-end rounded-full">
            <img
              src={formData.image}
              alt=""
              className="h-36 w-36 rounded-full"
            />
          </div>
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something......"
          className="mb-12 mt-8 h-72"
          required
          // value={formData.content}
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type="submit" className=" mt-14 w-full text-3xl">
          Publish
        </Button>
        {publishError && <Alert color="failure">{publishError}</Alert>}
      </form>
    </div>
  );
};

export default CreatePost;
