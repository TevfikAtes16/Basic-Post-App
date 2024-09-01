const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const {
  createPostController,
  getAllPostsController,
  getUserPostsController,
  deletePostController,
  updatePostController,
} = require("../controllers/postController");

const router = express.Router();

//create post
router.post("/create-post", requireSignIn, createPostController);

//get all post
router.get("/get-all-post", getAllPostsController);

//get user post
router.get("/get-user-post", requireSignIn, getUserPostsController);

//delete post
router.delete("/delete-post/:id", requireSignIn, deletePostController);

//update post
router.put("/update-post/:id", requireSignIn, updatePostController);

module.exports = router;
