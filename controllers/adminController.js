const User = require("../models/User");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const admin_get = (req, res) => {
  if (req.cookies.token) {
    return res.redirect("/admin/dashboard");
  }
  return res.render("pages/admin/index", { title: "Sign In" });
};

const admin_post = async (req, res, next) => {
  const { password, username } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("Invalid username or password");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("Invalid username or password");
    }

    const token = jwt.sign({ user: user._id }, process.env.SECRET);
    res.cookie("token", token);
    res.redirect("/admin/dashboard");
  } catch (error) {
    next(error);
  }
};

const admin_dashboard = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.render("pages/admin/dashboard", { title: "Dashboard", posts });
  } catch (error) {
    next(error);
  }
};

const admin_create_get = (req, res) => {
  res.render("pages/admin/create", { title: "Create Post" });
};

const admin_create_post = async (req, res, next) => {
  const { title, body } = req.body;

  try {
    const post = new Post({ title, body });
    await post.save();
    res.redirect("/admin/dashboard");
  } catch (error) {
    next(error);
  }
};

const admin_edit_put = async (req, res, next) => {
  const id = req.params.id;
  const { title, body } = req.body;

  try {
    await Post.findByIdAndUpdate(id, { title, body });
    res.redirect(`/posts/${id}`);
  } catch (error) {
    next(error);
  }
};

const admin_edit_get = async (req, res, next) => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id);
    res.render("pages/admin/edit", { title: "Edit Post", post });
  } catch (error) {
    next(error);
  }
};

const admin_delete = async (req, res, next) => {
  const id = req.params.id;

  try {
    await Post.findByIdAndDelete(id);
    res.redirect("/admin/dashboard");
  } catch (error) {
    next(error);
  }
};

const admin_logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/admin");
};

module.exports = {
  admin_get,
  admin_post,
  admin_delete,
  admin_logout,
  admin_edit_get,
  admin_edit_put,
  admin_dashboard,
  admin_create_get,
  admin_create_post,
};
