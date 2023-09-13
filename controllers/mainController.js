const Post = require("../models/Post");

const index = async (req, res) => {
  try {
    const perPage = 10;
    const page = parseInt(req.query.page) || 1;

    const [posts, count] = await Promise.all([
      Post.aggregate([{ $sort: { createdAt: -1 } }])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(),
      Post.countDocuments(),
    ]);

    const nextPage = page + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("pages/index", {
      posts,
      title: "Home",
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (error) {
    // Handle any errors that may occur during database queries
    res.status(500).send("Internal Server Error");
  }
};

const about = (req, res) => {
  res.redirect("/");
};

const contact = (req, res) => {
  res.redirect("/");
};

module.exports = { index, about, contact };
