const getIndexPage = (req, res) => {
  console.log("Req User", req.user);

  res.render("index", {
    pages: "index",
  });
};
const getAboutPage = (req, res) => {
  res.render("about", {
    pages: "about",
  });
};

const getRegisterPage = (req, res) => {
  res.render("register", {
    pages: "register",
  });
};
const getLoginPage = (req, res) => {
  res.render("login", {
    pages: "login",
  });
};

const getLogout = (req, res) => {
  res.cookie('jwt', '', {
    maxAge: 1,
  });
  res.redirect('/');
};


export { getIndexPage, getAboutPage, getRegisterPage, getLoginPage,getLogout };
