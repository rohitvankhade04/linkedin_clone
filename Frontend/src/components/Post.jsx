import { useContext, useEffect, useState } from "react"
import axios from "axios"
import React from 'react'
import userdp2 from "../assets/userdp2.png"
import moment from "Moment"
import { FaRegCommentDots } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import { authDataContext } from "../context/AuthContext"
import { userDataContext } from "../context/UserContext"


function Post({ id, author, likes, comments, description, image, createdAt }) {
  let [more, setMore] = useState(false);
  let { serverUrl } = useContext(authDataContext)
  let [arrayOfLikes, setArrayOfLikes] = useState(likes || []);
  let [commentText, setCommentText] = useState("");
  let [arrayOfComments, setArrayOfComments] = useState(comments || []);
  let [showComments, setShowComments] = useState(false)

  let { getPost, userData } = useContext(userDataContext)
  async function like() {
    try {
      let result = await axios.post(serverUrl + `/api/post/like/${id}`, {}, { withCredentials: true })
      console.log(result)
      setArrayOfLikes(result.data.likes);
    } catch (error) {
      console.log("------------LIKING THE POST ERROR------------------")
      console.log(error)
      console.log("---------------------------------------------------")
    }

  }

  async function handleComment(e) {
    try {
      e.preventDefault()
      let result = await axios.post(serverUrl + `/api/post/comment/${id}`, { content: commentText }, { withCredentials: true })
      console.log(result)
      setArrayOfComments(result.data.comments)
      setCommentText("")
      console.log(result.data.comments)
    } catch (error) {
      console.log("------------ COMMENTING THE POST ERROR------------------")
      console.log(error)
      console.log("---------------------------------------------------")
    }

  }
  useEffect(() => { getPost() }, [arrayOfLikes, setArrayOfLikes, arrayOfComments, setArrayOfComments])

  return (
    <div className='w-full min-h-[200px] bg-white rounded-xl p-[15px] flex flex-col gap-[8px]'>
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
        <div className={`${!more ? "max-h-[100px] overflow-hidden" : ""}  text-[17px] break-words whitespace-normalro`}> {description}</div>
        <div className='font-semibold cursor-pointer' onClick={() => { setMore(prev => !prev) }}>{!more ? "see more..." : "see less..."}</div>
      </div>

      {image && <div className='flex justify-center w-[full] h-[300px]'><img src={image} className='rounded-lg' /></div>}

      <div className="flex flex-row items-center justify-between p-[10px] ">
        <div className="flex flex-row items-center" ><BiLike className="text-blue-400" /><div><span className="text-[18px] ">{arrayOfLikes.length}</span></div></div>
        <div onClick={() => { setShowComments(c => !c)}}  className="cursor-pointer"><span>{arrayOfComments.length} comments</span></div>
      </div>

      <div className="w-full border-[1px]"></div>

      <div className="flex flex-row items-center gap-[20px] p-[10px]">
        <div className="flex flex-row items-center gap-[3px] cursor-pointer" onClick={like}>
          {arrayOfLikes.includes(userData._id) ? <BiSolidLike className="text-blue-400" /> : <BiLike />}
          <span className={arrayOfLikes.includes(userData._id) ? "text-blue-400" : ""}>{arrayOfLikes.includes(userData._id) ? "Liked" : "Like"}</span>
        </div>
        <div className="flex flex-row items-center gap-[3px] cursor-pointer" onClick={() => { setShowComments(c => !c) }}>
          <FaRegCommentDots />
          <span>Comment</span>
        </div>
      </div>

      {showComments && <div>
        <div>
          <form className="flex flex-row justify-between border-b-2 pb-[10px]" >
            <input type="text" placeholder="leave a comment..." className="border-none outline-none items-center" value={commentText} onChange={(e) => { setCommentText(e.target.value) }} />
            <button className=' h-[40px]  rounded-full border-1 bg-blue-400 text-white flex items-center justify-center p-[10px] hover:bg-gray-300 overflow-hidden' onClick={handleComment}><IoSend /></button>

          </form>

        </div>
        <div>
          {comments.map((comm, id) => (
            <div id={id} className="flex flex-col gap-[5px] p-[10px] shadow-sm rounded-lg">
              <div className="flex flex-row gap-[10px] items-center">
                <div className=' w-[30px] h-[30px] shrink-0  rounded-full overflow-hidden flex items-center justify-center cursor-pointer'>
                  <img src={comm.user.profileImage || userdp2} className='h-full w-full bg-transparent object-cover' />
                </div>
                <div className='text-[19px] font-medium'>
                  {comm.user.firstName} {comm.user.lastName}
                </div>
                <div className='text-[14px]'>
                  {moment(comm.createdAt).fromNow()}
                </div>
              </div>

              <div className="pl-[40px]"> {comm.content}</div>
            </div>
          ))}
        </div>
      </div>}


    </div>
  )
}

export default Post
