import User from "../models/User";
import Video from "../models/Video";
import Comment from "../models/Comment";

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

  await Video.findByIdAndUpdate(videoId, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  req.flash("success", "Changes saved.");
  return res.redirect(`/videos/${videoId}`);
};

export const uploadVideo = async (req, res) => {
  const userId = req.session.user._id;
  const { video, thumbnail } = req.files; // NOTE: 각 필드가 배열로 들어옴
  const { title, description, hashtags } = req.body;

  try {
    const newVideo = await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      fileUrl: video[0].path,
      thumbnailUrl: thumbnail[0].path,
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

export const createComment = async (req, res) => {
  const user = req.session.user;
  const videoId = req.params.id;
  const text = req.body.text;

  const video = await Video.findById(videoId);
  if (!video) {
    return res.sendStatus(404);
  }

  const comment = await Comment.create({
    text,
    owner: user._id,
    video: videoId,
  });

  // TODO: 필요시 user.comments 추가
  video.comments.push(comment._id);
  video.save();

  return res.status(201).json({ id: comment._id });
};
