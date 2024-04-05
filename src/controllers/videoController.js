import Video from "../models/Video";
import User from "../models/User";

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });

  return res.render("pages/home", {
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
  return res.render("pages/search", { pageTitle: "Search", videos });
};

export const watchVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  const owner = await User.findById(video.owner);

  if (!video) {
    return res.render("pages/404", { pageTitle: "Video not found." });
  }
  return res.render("pages/watch", { pageTitle: video.title, video, owner });
};

export const editVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  if (!video) {
    return res.render("pages/404", { pageTitle: "Video not found." });
  }
  return res.render("pages/edit", { pageTitle: `Edit ${video.title}`, video });
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;

  await Video.findByIdAndDelete(id);

  return res.redirect("/");
};

export const uploadVideo = (req, res) => {
  res.render("pages/upload", { pageTitle: "Upload Video" });
};
