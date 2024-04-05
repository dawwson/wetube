import User from "../models/User";
import Video from "../models/Video";

export const editVideo = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const isExists = Video.exists({ _id: id });
  if (!isExists) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });

  return res.redirect(`/videos/${id}`);
};

export const uploadVideo = async (req, res) => {
  const user = req.session.user;
  const file = req.file;
  const { title, description, hashtags } = req.body;

  try {
    const newVideo = await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      fileUrl: file.path,
      owner: user._id,
    });
    const owner = await User.findById(user._id);
    owner.videos.push(newVideo._id);
    owner.save();

    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("pages/upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
