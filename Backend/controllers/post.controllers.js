import uploadOnCloudinary from "../config/uploadCloudinary.js"
import { Post } from "../models/postmodel.js"

export const createPost = async (req, res) => {
    try {
        let { description } = req.body
        let newPost;
        if (req.file) {
            let image = await uploadOnCloudinary(req.file.path)
            newPost = await Post.create({
                author:req.userId,
                description,
                image
            })
        }
        else{
             newPost = await Post.create({
                author:req.userId,
                description,
            })
        }
        return res.status(200).json(newPost,{message:"post is created and uploaded in database"})
    } catch (error) {
        return res.status(201).json('create post error:${error}')
    }
}