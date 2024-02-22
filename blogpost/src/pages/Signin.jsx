import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import "../components/button/Button.css";
import { useDispatch, useSelector } from "react-redux";

import {
  singInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/UserSlice";
import OAuth from "../components/oauth/OAuth";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields"));
    }
    try {
      dispatch(singInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

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
            This is a Demo project. You can sign in with your email and password
            or with google.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="**********"
                id="password"
                onChange={handleChange}
              />
            </div>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}

            <button
              // gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
              className="button"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <p className="pl-3">Loading...</p>
                </>
              ) : (
                "Sign In"
              )}
            </button>
            {/* <Button
                gradientDuoTone="purpleToPink"
                type="submit"
                disabled={loading}
                className="button"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button> */}
            <OAuth />
          </form>

          <div className="mt-2 flex gap-2 text-sm">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500 underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
