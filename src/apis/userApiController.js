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

  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect("/");
};

export const editUser = async (req, res) => {
  // TODO: 이메일, username 중복 검사
  // 현재 session의 user와 req.body로 넘어온 값이 다르다면 사용자가 수정한 것임!
  const { _id } = req.session.user;
  const { email, username, name, location } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      email,
      username,
      name,
      location,
    },
    { new: true }
  );
  req.session.user = updatedUser;

  return res.redirect("/users/edit");
};
