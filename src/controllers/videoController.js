export const trending = (req, res) => {
  res.render("home");
};

export const searchVideo = (req, res) => {
  res.send("Search");
};

export const watchVideo = (req, res) => {
  res.render("watch");
};

export const editVideo = (req, res) => {
  res.render("edit");
};

export const deleteVideo = (req, res) => {
  res.send("Delete Video");
};

export const uploadVideo = (req, res) => {
  res.send("Upload Video");
};
