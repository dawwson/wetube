import { videos } from "../../data";

export const editVideo = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  videos[id - 1].title = title;

  res.redirect(`/videos/${id}`);
};

export const uploadVideo = (req, res) => {
  const { title } = req.body;
  const newVideo = {
    title: req.body.title,
    rating: 0,
    comments: 0,
    createdAt: "just now",
    views: 0,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  res.redirect("/");
};
