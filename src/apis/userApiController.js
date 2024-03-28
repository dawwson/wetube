import User from "../models/User";
import bcrypt from "bcrypt";

export const joinUser = async (req, res) => {
  const { email, username, password, confirmPassword, name, location } =
    req.body;

  if (password !== confirmPassword) {
    return res.status(400).render("pages/join", {
      pageTitle: "Join",
      errorMessage: "Password confirmation does not match.",
    });
  }

  const isUsernameExists = await User.exists({ username });
  if (isUsernameExists) {
    return res.status(400).render("pages/join", {
      pageTitle: "Join",
      errorMessage: "This username is already taken.",
    });
  }

  const isEmailExists = await User.exists({ email });
  if (isEmailExists) {
    return res.status(400).render("pages/join", {
      pageTitle: "Join",
      errorMessage: "This email is already taken.",
    });
  }

  try {
    User.create({
      email,
      username,
      password,
      name,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Create Account",
      errorMessage: error._message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("pages/login", {
      pageTitle: "Login",
      errorMessage: "An account with this username does not exists.",
    });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).render("pages/login", {
      pageTitle: "Login",
      errorMessage: "Wrong password.",
    });
  }
  return res.redirect("/");
};
