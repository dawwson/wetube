import Video from "../models/Video";

export const editVideo = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  res.redirect(`/videos/${id}`);
};

export const uploadVideo = async (req, res) => {
  const { title, description, hashtags } = req.body;

  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
      meta: { views: 0, rating: 0 },
    });

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
