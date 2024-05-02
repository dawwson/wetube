import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");

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
    }).populate("owner");
  }
  return res.render("pages/search", { pageTitle: "Search", videos });
};

export const watchVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner");

  if (!video) {
    return res.render("pages/404", { pageTitle: "Video not found." });
  }
  return res.render("pages/watch", { pageTitle: video.title, video });
};

export const editVideo = async (req, res) => {
  const { id } = req.params;
  const user = req.session.user;
  const video = await Video.findById(id);

  if (!video) {
    return res.render("pages/404", { pageTitle: "Video not found." });
  }

  if (String(video.owner) !== String(user._id)) {
    req.flash("error", "Not authorized.");
    return res.status(403).redirect("/");
  }

  return res.render("pages/edit", { pageTitle: `Edit ${video.title}`, video });
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const user = req.session.user;
  const video = await Video.findById(id);

  if (!video) {
    return res.render("pages/404", { pageTitle: "Video not found." });
  }

  if (String(video.owner) !== String(user._id)) {
    req.flash("error", "Not authorized.");
    return res.status(403).redirect("/");
  }

  await Video.deleteOne({ _id: id });
  return res.redirect("/");
};

export const uploadVideo = (req, res) => {
  res.render("pages/upload", { pageTitle: "Upload Video" });
};
