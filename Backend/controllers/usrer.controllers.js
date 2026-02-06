import User from "../models/usersmodel.js"

export const getCurrentUser =async (req,res)=>{
  try {
    const id=req.userId;
    const user=await User.findById(id).select("-password")
    if(!user){
        return res.status(400).json({message:"user is not found"})
    }
    return res.status(200).json(user)
  } catch (error) {
        return res.status(400).json({message:"get current user error"})
    }
}










export const updateProfile= async (req,res)=>{
  
} 