import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: { type: String, default: "" },
    image: { type: String },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
   comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            content: { type: String },
            createdAt:{type:Date,default:Date.now}
        }
    ]


}, { timestamps: true })
export const Post=mongoose.model("Post",postSchema)