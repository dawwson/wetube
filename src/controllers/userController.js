import config from "../config";
import * as fetch from "node-fetch";
import User from "../models/User";

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const reqConfig = {
    client_id: config.githubClientId,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(reqConfig).toString();

  return res.redirect(`${baseUrl}?${params}`);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const reqConfig = {
    client_id: config.githubClientId,
    client_secret: config.githubClientSecret,
    code: req.query.code,
  };
  const params = new URLSearchParams(reqConfig).toString();

  const tokenResponse = await (
    await fetch(`${baseUrl}?${params}`, {
      method: "POST",
      headers: { Accept: "application/json" },
    })
  ).json();

  if ("access_token" in tokenResponse) {
    const { access_token } = tokenResponse;
    const apiUrl = "https://api.github.com";

    const userResponse = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailResponse = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailObj = emailResponse.find(
      (email) => email.primary && email.verified
    );
    if (!emailObj) {
      return res.redirect("/login");
    }

    let user = await User.findOne({ email: emailObj.email });

    // NOTE: 데이터베이스에 동일한 이메일을 가진 사용자가 없으면 사용자를 생성 후 로그인
    // NOTE: 데이터베이스에 동일한 이메일을 가진 사용자가 있으면 데이터베이스 기준으로 로그인 시켜줌
    if (!user) {
      user = await User.create({
        email: emailObj.email,
        username: userResponse.login,
        name: userResponse.name,
        socialOnly: true,
        avataUrl: userResponse.avatar_url,
      });
    }

    req.session.loggedIn = true;
    req.session.user = user;

    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const join = (req, res) => {
  res.render("pages/join", { pageTitle: "Create Account" });
};

export const login = (req, res) => {
  res.render("pages/login", { pageTitle: "Login" });
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const seeUser = (req, res) => {
  res.send("See User");
};

export const editUser = (req, res) => {
  res.render("pages/edit-profile", { pageTitle: "Edit Profile" });
};

export const deleteUser = (req, res) => {
  res.send("Delete User");
};
