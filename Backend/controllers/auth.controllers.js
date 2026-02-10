import genToken from "../config/token.js";
import User from "../models/usersmodel.js";
import bcrypt from "bcrypt";
const signUp=async (req,res)=>{
   try {
    let {firstName,lastName,userName,email,password}=req.body;
    const alreadyEmail=await User.findOne({email});
    if(alreadyEmail){
        return res.status(400).json({message:"email already exists"})
    }
    const alreadyUsername=await User.findOne({userName});
    if(alreadyUsername){
        return res.status(400).json({message:"username already exixts"})
    }
    if(password.length<8){
        return res.status(400).json({message:"password need to be min 8 characters"})
    }
    const hashedPassword= await bcrypt.hash(password,10)
    const user=await User.create({
        firstName,
        lastName,
        userName,
        email,
        password:hashedPassword
    })
    console.log("user created")
    let token=await genToken(user._id);
    console.log("token generated")
    res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"strict",
        secure:process.env.NODE_ENVIRONMENT==="production"

    })
    console.log("yaha bhi aagaya")
    return res.status(201).json(user)

   } catch (error) {
    console.log("sign up error")
    return res.json(error)
   }
}
const login=async (req,res)=>{
    try {
        let {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"user not exists"})
        }
       const passwordMatch=await bcrypt.compare(password,user.password);
       if(!passwordMatch){
        return res.status(400).json({message:"password mismatch"})
       }
       
       
        let token=await genToken(user._id);
        console.log("token generated")
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"strict",
            secure:process.env.NODE_ENVIRONMENT==="production"

        })
       console.log("cookie is also set")
       console.log("login successfull!!")
        return res.status(200).json(user)
    } catch (error) {
        console.log("login has failed")
        return res.status(500).json(error)
    }
}
const logout=async (req,res)=>{
    try {
        res.clearCookie("token",{
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENVIRONMENT === "production"
    })
        return res.status(200).json({message:"logout successful"})
    } catch (error) {
        console.log("logout has failed")
        return res.status(500).json(error)
    }
}
export  {signUp ,login,logout};
