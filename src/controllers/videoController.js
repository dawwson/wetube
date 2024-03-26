import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });

  return res.render("home", {
    pageTitle: "Home",
    videos,
  });
};

export const searchVideo = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];

  if (keyword) {
    videos = await Video.find({
      title: { $regex: new RegExp(keyword, "i") },
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const watchVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const editVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;

  await Video.findByIdAndDelete(id);

  return res.redirect("/");
};

export const uploadVideo = (req, res) => {
  res.render("Upload", { pageTitle: "Upload Video" });
};
