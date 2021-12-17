const express = require("express");
const router = express.Router();

const blog_control = require("../controllers/blogController");


router.get("/blog", blog_control.fetchBlogDefault);

router.get("/blog/:id", blog_control.fetchBlogDefaultPer);

router.get("/comment/:id", blog_control.FindComments);

router.get("/blog/blog/:userID", blog_control.fetchBlogByUserID);

router.post("/blog", blog_control.newBlog);

router.put('/blog/:id', blog_control.updateBlog)

router.patch('/blog/like/:id' , blog_control.updateLikeInBlog);

router.patch('/blog/unlike/:id' , blog_control.updateunLikeInBlog);

router.post('/blog/comment/:id' , blog_control.CommentInBlog);

router.delete('/blog/:id', blog_control.deleteBlog)

module.exports = router;