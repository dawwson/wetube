// NOTE: 로그인하지 않는 사용자가 접근하지 않도록 로그인 페이지로 리다이렉트
const userOnlyMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
};

export default userOnlyMiddleware;
