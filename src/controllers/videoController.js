const fakeUser = { username: "Nico", loggedIn: true };

export const trending = (req, res) => {
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
  res.render("home", { pageTitle: "Home", fakeUser, videos });
};

export const searchVideo = (req, res) => {
  res.send("Search");
};

export const watchVideo = (req, res) => {
  res.render("watch", { pageTitle: "Watch" });
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
