export const trending = (req, res) => {
  res.render("home", { pageTitle: "Home" });
};

export const searchVideo = (req, res) => {
  res.send("Search");
};

export const watchVideo = (req, res) => {
  res.render("watch", { pageTitle: "Watch" });
};

export const editVideo = (req, res) => {
  res.render("edit", { pageTitle: "Edit" });
};

export const deleteVideo = (req, res) => {
  res.send("Delete Video");
};

export const uploadVideo = (req, res) => {
  res.send("Upload Video");
};
