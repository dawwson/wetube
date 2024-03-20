export const editVideo = (req, res) => {
  const { id } = req.params;
  res.redirect(`/videos/${id}`);
};
