import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
// 4:12:57
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="mx-auto w-full max-w-lg  p-3 shadow-md">
      <h1 className="my-7 text-center text-4xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-5">
        <div className="mb-10 h-32 w-32 cursor-pointer self-center overflow-hidden rounded-full shadow-md">
          <img
            src={currentUser.profilePicture}
            alt="Profile Picture"
            className="h-full w-full rounded-full border-8 border-[lightgray] object-cover"
          />
        </div>

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
