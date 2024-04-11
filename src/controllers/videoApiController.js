import User from "../models/User";
import Video from "../models/Video";

export const editVideo = async (req, res) => {
  const userId = req.session.user._id;
  const videoId = req.params.id;
  const { title, description, hashtags } = req.body;

  const video = await Video.findById(videoId);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }

  if (String(video.owner) !== String(userId)) {
    return res.status(403).redirect("/");
  }

  await Video.updateOne(
    { _id: videoId },
    {
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    }
  );

  return res.redirect(`/videos/${videoId}`);
};

export const uploadVideo = async (req, res) => {
  const userId = req.session.user._id;
  const file = req.file;
  const { title, description, hashtags } = req.body;

  try {
    const newVideo = await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      fileUrl: file.path,
      owner: userId,
    });
    const owner = await User.findById(userId);
    owner.videos.push(newVideo._id);
    owner.save();

    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("pages/upload", {
      pageTitle: "Upload Video",
      errorMessage: error.message,
    });
  }
};

export const addViews = async (req, res) => {
  const videoId = req.params.id;
  const video = await Video.findById(videoId);

  if (!video) {
    return res.sendStatus(404);
  }

  video.meta.views += 1;
  await video.save();

  return res.sendStatus(200);
};
