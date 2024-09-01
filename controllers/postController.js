const postModel = require("../models/postModel");

const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    //validate
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Can't be empty title or description fields",
      });
    }
    const post = await postModel({
      title,
      description,
      postedBy: req.auth._id,
    }).save();

    res.status(201).send({
      success: true,
      message: "Post Created Successfully",
      post,
    });

    console.log(req);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Post Api",
      error,
    });
  }
};

//Get all posts
const getAllPostsController = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "All Posts Data",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Post Api",
    });
  }
};

//get user post

const getUserPostsController = async (req, res) => {
  try {
    const userPosts = await postModel.find({ postedBy: req.auth._id });
    res.status(200).send({
      success: true,
      message: "user posts",
      userPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in User Post Api",
      error,
    });
  }
};

//delete post
const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Your Post been deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in delete post api",
      error,
    });
  }
};

//update post
const updatePostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = await postModel.findById({ _id: req.params.id });
    //validation
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Please provide post title or description",
      });
    }
    const updatedPost = await postModel.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        title: title || post?.title,
        description: description || post?.description,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Post has been updated successfully",
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Update Post Api",
      error,
    });
  }
};

module.exports = {
  createPostController,
  getAllPostsController,
  getUserPostsController,
  deletePostController,
  updatePostController,
};
