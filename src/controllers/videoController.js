const user = { username: "Nico", loggedIn: true };
const videos = [
  {
    title: "Video #1",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 10,
    id: 1,
  },
  {
    title: "Video #2",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 10,
    id: 2,
  },
  {
    title: "Video #3",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 10,
    id: 3,
  },
];

export const trending = (req, res) => {
  res.render("home", { pageTitle: "Home", user, videos });
};

export const searchVideo = (req, res) => {
  res.send("Search");
};

export const watchVideo = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];

  res.render("watch", { pageTitle: `Watching ${video.title}`, user, video });
};

export const editVideo = (req, res) => {
  res.render("edit", { pageTitle: "Edit" });
};

export const deleteVideo = (req, res) => {
  res.send("Delete Video");
};

export const uploadVideo = (req, res) => {
  res.send("Upload Video");
};
