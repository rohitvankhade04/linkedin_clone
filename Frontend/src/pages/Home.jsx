import React, { useContext, useEffect, useState } from 'react';
import Nav from '../components/nav';
import userdp2 from "../assets/userdp2.png"
import { RxCrossCircled } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa6";
import axios from 'axios';

import { FaPlus } from "react-icons/fa6";
import { IoCameraOutline } from "react-icons/io5";
import { HiPencil } from "react-icons/hi2";
import { userDataContext } from '../context/UserContext';
import EditProfile from '../components/EditProfile.jsx';
import { useRef } from 'react';
import { authDataContext } from '../context/AuthContext.jsx';
import Post from '../components/Post.jsx';



function Home() {
  let { userData, setUserData, edit, setEdit, postData, setPostData } = useContext(userDataContext);
  let [frontendImage, setFrontendImage] = useState("");
  let [backendImage, setBackendImage] = useState("");
  let [createPostBox, setCreatePostBox] = useState(false);
  let [description, setdescription] = useState("");
  let { serverUrl } = useContext(authDataContext);
  let [posting, setPosting] = useState(false)


  let image = useRef();

  function handleImage(e) {
    let file = e.target.files[0]
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file))

  }

  async function handleUploadPost() {
    setPosting(true)
    try {
      let formdata = new FormData();
      formdata.append("description", description)
      if (backendImage) {
        formdata.append("image", backendImage)
      }
      console.log(serverUrl)

      let result = await axios.post(serverUrl + "/api/post/create", formdata, { withCredentials: true })
      console.log(result)
      setPosting(false)
      setdescription("");
      setBackendImage("")

      setCreatePostBox(false)


    } catch (error) {
      console.log("------------------------------------")
      console.log(error.response)
      console.log(error.request)
      console.log(error.message)
      console.log("------------------------------------")

    }
  }


  return (<div>
    {userData && <div>
      {edit && <EditProfile />}

      <div className='w-full min-h-[100vh] bg-[#e7e6df] pt-[80px] flex items-start justify-center gap-[20px]  px-[20px] flex-col lg:flex-row'>

        <Nav />


        <div className=' w-full lg:w-[25%] min-h-[100px] bg-white shadow-lg rounded-lg p-[10px] relative' >
          {/* -------------left div------------- */}
          <div className='w-[100%] h-[150px] bg-gray-500 rounded overflow-hidden items-center justify-center relative cursor-pointer' onClick={() => { setEdit(true) }}>
            <img src={userData.coverImage || userdp2} alt="" className='w-full flex justify-center items-center object-cover' />
            <IoCameraOutline className='absolute right-[15px] top-[10px] h-[25px] w-[25px] text-white cursor-pointer' />

          </div>
          <div className=' w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center relative left-[30px] top-[-45px] cursor-pointer' onClick={() => { setEdit(true) }}>
            <img src={userData.profileImage || userdp2} className='h-full bg-transparent object-cover'></img>

          </div>
          <div className='w-[15px] h-[15px] bg-blue-400 absolute top-[158px] left-[97px] rounded-full flex items-center justify-center'>
            <FaPlus className='text-white cursor-pointer' onClick={() => { setEdit(true) }} />
          </div>
          <div className='flex flex-col gap-[10px] mt-[-30px] px-[10px]'>

            <div className='text-gray-600'>
              <div className='text-[19px] font-semibold'>
                {userData.firstName} {userData.lastName}
              </div>

              <div className='text-[19px]'>
                {userData.headline}
              </div>

              <div className='text-gray-500 text-[15px]'>
                {userData.location}
              </div>
            </div>

            <button
              className='w-full h-[35px] rounded-full border-2 border-blue-400 text-blue-400 flex justify-center items-center gap-[10px] hover:bg-gray-200'
              onClick={() => setEdit(true)}
            >
              Edit Profile <HiPencil />
            </button>

          </div>



        </div>





        {/* ---------------hidden input for weilding image for post */}
        <input type='file' accept='image/*' hidden ref={image} onChange={handleImage} />
        {/* ---------------hidden input for weilding image for post */}


        {/* -----------------create a post card----------------------------------------------------------------------------------------------------------------------- */}
        {createPostBox && <div className='fixed inset-0 bg-black/60  z-[50] w-full h-full flex items-center justify-center'>
          <div className='relative w-[400px] max-h-[90vh] bg-white z-[100] rounded-lg p-[10px] flex flex-col gap-[10px]'>
            <RxCrossCircled className="absolute right-[5px] top-[5px] w-[20px] h-[20px] text-gray-600 cursor-pointer " onClick={() => {
              setCreatePostBox(false)
              setFrontendImage("")
            }} />
            {/* ---------header-------- */}
            <div className='flex flex-row gap-[10px] items-center justify-start'>
              <div className=' w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center cursor-pointer' onClick={() => { setEdit(true) }}>
                <img src={userData.profileImage || userdp2} className='h-full bg-transparent object-cover'></img>
              </div>
              <div className='text-[19px] font-normal'>
                {userData.firstName} {userData.lastName}
              </div>
            </div>
            {/* /-----scrollable content---- */}
            <div className='flex flex-col gap-[10px] overflow-y-auto'>
              <textarea className={`w-full ${frontendImage ? " h-[80px]" : "h-[320px]"} resize-none outline-none px-[10px]`} value={description} placeholder='What is on you mind..?' onChange={(e) => setdescription(e.target.value)}></textarea>
              {frontendImage && (<img src={frontendImage} alt="preview" className='w-full h-auto object-cover rounded-lg  overflow-y-auto' />)}
            </div>
            {/* ----------footer------- */}
            <div className='flex flex-col gap-[10px] mt-auto pt-[10px]'>
              <FaRegImage className="cursor-pointer" onClick={() => image.current.click()} />
              <div className='w-full h-[1px] bg-black '></div>
              <div className='flex justify-end'>
                <button className="w-[90px] h-[45px] rounded-full shadow-xl bg-blue-400 text-white flex justify-center items-center gap-[10px] hover:bg-blue-300" onClick={handleUploadPost} disabled={posting}>{posting ? "posting..." : "POST"}</button>
              </div>


            </div>
          </div>
        </div>}
        {/* ----------------- end of create a post card------------------------------------------------------------------------------------------------------------------------------- */}




        <div className=' w-full lg:w-[50%] min-h-[100px] bg-[#e7e6df]  relative rounded-xl flex flex-col gap-[20px] '>
          {/* -------------middle div------------- */}
          <div className=' w-full flex flex-row py-[20px] shadow-lg bg-white items-center justify-center gap-[40px] px-[100px] overflow-hidden rounded-xl'>
            <div className=' w-[70px] h-[70px] shrink-0  rounded-full overflow-hidden flex items-center justify-center cursor-pointer'>
              <img src={userData.profileImage || userdp2} className='h-full w-full bg-transparent object-cover'></img>
            </div>
            <button
              className='flex-1 min-w-0 h-[40px]  rounded-full border-2 border-blue-400 text-blue-400 flex items-center justify-center px-4  hover:bg-gray-200 overflow-hidden' onClick={() => setCreatePostBox(true)}
            ><span className='truncate whitespace-nowrap'> Create a Post</span>

            </button>
          </div>
          {postData && postData.map((post, index) => (<Post key={index} id={post._id} author={post.author} likes={post.likes} comments={post.comments} description={post.description} image={post.image} createdAt={post.createdAt} />))}
        </div>





        <div className=' w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg rounded-lg'>
          {/* ---------------right div-------------- */}


        </div>

      </div>
    </div>}
  </div >)

}

export default Home
