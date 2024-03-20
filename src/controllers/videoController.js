import { user, videos } from "../../data";

export const trending = (req, res) => {
  res.render("home", { pageTitle: "Home", user, videos });
};

export const searchVideo = (req, res) => {
  res.send("Search");
};

export const watchVideo = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];

  res.render("watch", { pageTitle: `Watching ${video.title}`, user, video });
};

export const editVideo = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];

  res.render("edit", { pageTitle: `Editing: ${video.title}`, user, video });
};

export const deleteVideo = (req, res) => {
  res.send("Delete Video");
};

export const uploadVideo = (req, res) => {
  res.render("Upload", { pageTitle: "Upload Video", user });
};
