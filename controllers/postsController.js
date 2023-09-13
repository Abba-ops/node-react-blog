const Post = require("../models/Post");

const get_post_details = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      // Handle the case when the post is not found
      return res.status(404).send("Post not found");
    }

    res.render("pages/post", { post, title: "Post Details" });
  } catch (error) {
    // Handle any other errors that may occur during database query
    next(error);
  }
};

module.exports = { get_post_details };
