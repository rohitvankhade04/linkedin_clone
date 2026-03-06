import uploadOnCloudinary from "../config/uploadCloudinary.js"
import { getIo } from "../socket/socket.js";
import { Post } from "../models/postmodel.js";

export const createPost = async (req, res) => {
    try {
        let { description } = req.body
        let newPost;
        if (req.file) {
            let image = await uploadOnCloudinary(req.file.path)
            newPost = await Post.create({
                author: req.userId,
                description,
                image
            })
        }
        else {
            newPost = await Post.create({
                author: req.userId,
                description,
            })
        }
        return res.status(200).json({ message: "post is created and uploaded in database" })
    } catch (error) {
        return res.status(201).json({ message: `create post error:${error}` })

    }
}

export const getPost = async (req, res) => {
    try {
        const post = await Post.find()
            .populate("author", "firstName lastName userName headline profileImage")
            .populate("comments.user", "firstName lastName profileImage")
            .sort({ createdAt: -1 })
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({ message: "getPost error" })


    }

}

export const like = async (req, res) => {
    let userId = req.userId;
    let postId = req.params.id;
    console.log("Received postId:", postId);

    try {
        let post = await Post.findById(postId)
        if (!post) {
            return res.status(400).json({ message: "post not found" })
        }
        const alreadyLiked = post.likes.some(
            (id) => id.toString() === userId
        )

        if (alreadyLiked) {
            post.likes = post.likes.filter(
                (id) => id.toString() !== userId
            )
        } else {
            post.likes.push(userId)
        }
        await post.save()

        getIo().emit("likeUpdated", { postId, likes: post.likes })

        return res.status(200).json(post)

    } catch (error) {
        return res.status(500).json({ message: "error of liking the post at like controller in like route" })
    }
}
export const comment = async (req, res) => {
    let userId = req.userId;
    let { content } = req.body
    let postId = req.params.id;

    try {
        if (!content) {
            return res.status(400).json({ message: "comment cannot be empty" })
        }
        const post = await Post.findByIdAndUpdate(
            postId, { $push: { comments: { user: userId, content } } },
            { new: true })
            .populate("comments.user", "firstName lastName profileImage")

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        getIo().emit("commentUpdated", { postId, comm: post.comments })


        return res.status(200).json(post);

    } catch (error) {
        return res.status(500).json({ message: "error of commenting the post at comment controller in comment route" })
    }
}