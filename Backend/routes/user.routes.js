import express from "express";
import { getCurrentUser, updateProfile } from "../controllers/usrer.controllers.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multerMiddleware.js";
let userRouter=express.Router();
userRouter.get("/currentuser",isAuth,getCurrentUser)
userRouter.put("/updateprofile",isAuth,upload.fields([
    {name:"profileImage",maxCount:1},
    {name:"coverImage",maxCount:1}
]),updateProfile)

export default userRouter  