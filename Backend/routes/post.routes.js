import express from "express";
import isAuth from "../middlewares/isAuth.js";
import multer from "multer";
import upload from "../middlewares/multerMiddleware.js";
import { createPost } from "../controllers/post.controllers.js";
import { getPost,like,comment } from "../controllers/post.controllers.js";
const postRouter=express.Router();
postRouter.post("/create", isAuth, upload.single("image"),createPost )
postRouter.get("/getpost", isAuth, getPost )
postRouter.post("/like/:id", isAuth, like )
postRouter.post("/comment/:id", isAuth, comment )


export default postRouter