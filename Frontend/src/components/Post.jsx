import { useContext, useEffect, useState } from "react"
import axios from "axios"
import React  from 'react'
import userdp2 from "../assets/userdp2.png"
import moment from "Moment"
import { FaRegCommentDots } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { authDataContext } from "../context/AuthContext"
import { userDataContext } from "../context/UserContext"


function Post({ id, author, likes, comments, description, image, createdAt }) {
  let[more,setMore]=useState(false);
  let {serverUrl}=useContext(authDataContext)
  let[arrayOfLikes,setArrayOfLikes]=useState(likes||[]);
  let {getPost,userData}=useContext(userDataContext)
   async function like(){ 
    try {
      let result=await axios.post(serverUrl+`/api/post/like/${id}`,{},{withCredentials:true})
      console.log(result)
      setArrayOfLikes(result.data.likes);
    } catch (error) {
      console.log("------------LIKING THE POST ERROR------------------")
      console.log(error)
      console.log("---------------------------------------------------")
    }

  }
  useEffect(()=>{getPost()},[arrayOfLikes,setArrayOfLikes])

  return (
    <div className='w-full min-h-[200px] bg-white rounded-xl p-[15px] flex flex-col gap-[10px]'>
      {/* -------------author details and button */}
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-row gap-[15px]  items-center'>
          <div className=' w-[70px] h-[70px] shrink-0  rounded-full overflow-hidden flex items-center justify-center cursor-pointer'>
            <img src={author.profileImage || userdp2} className='h-full w-full bg-transparent object-cover' />
          </div>
          <div >
            <div className='text-[19px] font-medium'>
              {author.firstName} {author.lastName}
            </div>

            <div className='text-[15px]'>
              {author.headline}
            </div>
            <div className='text-[15px]'>
              {moment(createdAt).fromNow()}
            </div>
          </div>

        </div>
        <div>
          <button className=' h-[40px]  rounded-full border-2 border-blue-400 text-blue-400 flex items-center justify-center p-[10px] hover:bg-gray-100 overflow-hidden'>connect</button>
        </div>
      </div>
      {/* --------------------------------------- */}
      <div className='px-[30px] text-[17px]'>
        <div className={`${ !more ? "max-h-[100px] overflow-hidden":""}  text-[17px] break-words whitespace-normalro`}> {description}</div>
        <div className='font-semibold cursor-pointer'onClick={()=>{setMore(prev=>!prev)}}>{!more?"see more...":"see less..."}</div>
      </div>

      {image && <div className='flex justify-center w-[full] h-[300px]'><img src={image} className='rounded-lg' /></div>}

      <div className="flex flex-row items-center justify-between p-[10px] ">
        <div className="flex flex-row items-center" ><BiLike className="text-blue-400"/><div><span className="text-[18px] ">{arrayOfLikes.length}</span></div></div>
        <div><span>{comments.length} comments</span></div>
      </div>

      <div className="w-full border-[1px]"></div>

      <div className="flex flex-row items-center gap-[20px] p-[10px]">
        <div className="flex flex-row items-center gap-[3px] cursor-pointer" onClick={like}>
          {arrayOfLikes.includes(userData._id)?<BiSolidLike className="text-blue-400"/>:<BiLike />}
          <span className={arrayOfLikes.includes(userData._id)?"text-blue-400":""}>{arrayOfLikes.includes(userData._id)?"Liked":"Like"}</span>
        </div>
        <div className="flex flex-row items-center gap-[3px]">
          <FaRegCommentDots />
          <span>Comment</span>
        </div>
      </div>
    </div>
  )
}

export default Post
