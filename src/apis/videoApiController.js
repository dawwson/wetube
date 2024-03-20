import { videos } from "../../data";

export const editVideo = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  videos[id - 1].title = title;

  res.redirect(`/videos/${id}`);
};
