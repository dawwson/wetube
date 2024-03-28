import User from "../models/User";

export const createUser = (req, res) => {
  const { email, username, password, name, location } = req.body;
  User.create({
    email,
    username,
    password,
    name,
    location,
  });
  return res.redirect("/login");
};
