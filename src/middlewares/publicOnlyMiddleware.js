// NOTE: 로그인한 사용자가 접근하면 메인 페이지로 리다이렉트
const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};

export default publicOnlyMiddleware;
