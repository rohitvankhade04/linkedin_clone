import express from "express";
let app=express();
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.Routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
let port=process.env.PORT;
app.use("/api/auth",authRouter)
app.get("/",(req,res)=>{
    res.send("hello")
})



app.listen(port,()=>{
    connectDb();
    console.log("listenning on port:",port);

})