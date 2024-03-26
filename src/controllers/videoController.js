import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});

  return res.render("home", {
    pageTitle: "Home",
    videos,
  });
};

export const searchVideo = (req, res) => {
  res.send("Search");
};

export const watchVideo = async (req, res) => {
  const { id } = req.params;

  const video = await Video.findById(id);

  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }

  return res.render("watch", { pageTitle: video.title, video });
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
