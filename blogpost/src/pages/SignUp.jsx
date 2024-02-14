import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

const SignUp = () => {
  return (
    <div className="mt-20 min-h-screen  ">
      <div className="max-auto m-auto flex max-w-3xl flex-col gap-5 p-3 md:flex-row  md:items-center ">
        {/* left side */}
        <div className=" flex-1  ">
          <Link to="/" className=" text-4xl  font-bold dark:text-white">
            <span className="rounded-lg bg-gradient-to-r from-red-500 via-red-200 to-green-300 px-2 py-1">
              Naji's
            </span>
            Blog
          </Link>

          <p className="mt-5 text-sm">
            This is a Demo project. You can jsign up with your email and
            password or with google.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput type="password" placeholder="password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sing In
            </Button>
          </form>
          <div className="mt-2 flex gap-2 text-sm">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500 underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
