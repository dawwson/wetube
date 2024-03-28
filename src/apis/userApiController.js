import User from "../models/User";

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
