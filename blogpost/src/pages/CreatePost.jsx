// 05:51:30
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
// 06:01:40
const CreatePost = () => {
  return (
    <div className="mx-auto min-h-screen max-w-3xl  p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Create Post</h1>
      <form>
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="mt-6 flex flex-col justify-between gap-4 border-4 border-dotted border-green-200 p-3 sm:flex-row">
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone="perpleToBlue"
            size="sm"
            className="border border-gray-500 bg-gray-800 text-white  hover:bg-black"
          >
            Upload Image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="mb-12 mt-8 h-72"
          required
        />
        <Button type="submit" className=" mt-14 w-full text-3xl">
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
