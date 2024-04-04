/**
 * res.locals 프로퍼티에 템플릿에서 사용할 데이터 담아주는 미들웨어
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.session.user;
  res.locals.siteName = "Wetube";
  next();
};

/**
 * 로그인한 사용자가 접근하면 메인 페이지로 리다이렉트 해주는 미들웨어
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};

/**
 * 로그인하지 않는 사용자가 접근하면 로그인 페이지로 리다이렉트
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const userOnlyMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
};
