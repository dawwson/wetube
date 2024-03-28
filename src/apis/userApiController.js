import User from "../models/User";

export const createUser = async (req, res) => {
  const { email, username, password, confirmPassword, name, location } =
    req.body;

  if (password !== confirmPassword) {
    return res.render("pages/join", {
      pageTitle: "Join",
      errorMessage: "Password confirmation does not match.",
    });
  }

  const isUsernameExists = await User.exists({ username });
  if (isUsernameExists) {
    return res.render("pages/join", {
      pageTitle: "Join",
      errorMessage: "This username is already taken.",
    });
  }

  const isEmailExists = await User.exists({ email });
  if (isEmailExists) {
    return res.render("pages/join", {
      pageTitle: "Join",
      errorMessage: "This email is already taken.",
    });
  }

  User.create({
    email,
    username,
    password,
    name,
    location,
  });
  return res.redirect("/login");
};
