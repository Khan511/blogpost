import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import "../components/button/Button.css";
import OAuth from "../components/oauth/OAuth";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [erroMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setErrorMessage(data.message);
        setLoading(false);
      }
      setLoading(false);

      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
            This is a Demo project. You can jsign up with your email and
            password or with google.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
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
            {erroMessage && (
              <Alert className="mt-5" color="failure">
                {erroMessage}
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
                "Sign Up"
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
                "Sign Un"
              )}
            </Button> */}
            <OAuth />
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
