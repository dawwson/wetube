export const editVideo = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  res.redirect(`/videos/${id}`);
};

export const uploadVideo = (req, res) => {
  res.redirect("/");
};
