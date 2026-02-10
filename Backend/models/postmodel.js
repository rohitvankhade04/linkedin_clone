import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: { type: String, default: "" },
    image: { type: String },
    like: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
   comment: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            content: { type: String }
        }
    ]


}, { timestamps: true })
export const Post=mongoose.model("Post",postSchema)