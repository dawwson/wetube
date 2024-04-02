const localsMiddleware = (req, res, next) => {
  // TODO: 로그 삭제
  console.log(req.session);
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.session.user;
  res.locals.siteName = "Wetube";
  next();
};

export default localsMiddleware;
