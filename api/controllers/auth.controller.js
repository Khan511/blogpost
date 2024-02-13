import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { ErrorHandler } from "../utils/Error.js";

const SignUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(ErrorHandler(400, "All Fields are required!"));
  }

  const hashpassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });

  try {
    await newUser.save();

    res.json({ message: "Signup successful" });
  } catch (error) {
    next(error);
  }
};

export default SignUp;
