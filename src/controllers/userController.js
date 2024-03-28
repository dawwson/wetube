export const join = (req, res) => {
  res.render("pages/join", { pageTitle: "Create Account" });
};

export const login = (req, res) => {
  res.send("Login");
};

export const logout = (req, res) => {
  res.send("Logout");
};

export const seeUser = (req, res) => {
  res.send("See User");
};
export const editUser = (req, res) => {
  res.send("Edit User");
};

export const deleteUser = (req, res) => {
  res.send("Delete User");
};
