import mongoose from "mongoose";
let connectionSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    reciever: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default:"pending"
    }
}, { timestamps: true })
const Connections=mongoose.model("Connections",connectionSchema)
export default Connections