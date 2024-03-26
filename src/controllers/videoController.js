export const trending = (req, res) => {
  res.render("home", { pageTitle: "Home" });
};

export const searchVideo = (req, res) => {
  res.send("Search");
};

export const watchVideo = (req, res) => {
  const { id } = req.params;

  res.render("watch", { pageTitle: `Watching ` });
};

export const editVideo = (req, res) => {
  const { id } = req.params;

  res.render("edit", { pageTitle: `Editing:` });
};

export const deleteVideo = (req, res) => {
  res.send("Delete Video");
};

export const uploadVideo = (req, res) => {
  res.render("Upload", { pageTitle: "Upload Video" });
};
