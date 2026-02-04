import React, { useContext } from 'react';
import Nav from '../components/nav';
import userdp2 from "../assets/userdp2.png"

import { FaPlus } from "react-icons/fa6";
import { IoCameraOutline } from "react-icons/io5";
import { HiPencil } from "react-icons/hi2";
import { userDataContext } from '../context/UserContext';
import EditProfile from '../components/EditProfile.jsx';



function Home() {
  let { userData, setUserData, edit, setEdit } = useContext(userDataContext);
  return (<div>
    {edit && <EditProfile />}

    <div className='w-full min-h-[100vh] bg-[#e7e6df] pt-[80px] flex items-start justify-center gap-[20px]  px-[20px] flex-col lg:flex-row'>

      <Nav />
      <div className=' w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg rounded-lg p-[10px] relative' >
        {/* -------------left div------------- */}
        <div className='w-[100%] h-[100px] bg-gray-500 rounded overflow-hidden items-center justify-center relative cursor-pointer' onClick={() => { setEdit(true) }}>
          <img src="" alt="" className='w-full' />
          <IoCameraOutline className='absolute right-[15px] top-[10px] h-[25px] w-[25px] text-white cursor-pointer' />

        </div>
        <div className=' w-[70px] h-[70px] rounded-full overflow-hidden items-center justify-center relative left-[30px] top-[-45px] cursor-pointer' onClick={() => { setEdit(true) }}>
          <img src={userdp2} className='h-full bg-transparent'></img>

        </div>
        <div className='w-[15px] h-[15px] bg-blue-400 absolute top-[110px] left-[95px] rounded-full flex items-center justify-center'>
          <FaPlus className='text-white cursor-pointer' onClick={() => { setEdit(true) }} />
        </div>
        <div className='absolute top-[135px] left-[15px] text-gray-600 '>
          <div className=' text-[19px] font-semibold'>{userData.firstName} {userData.lastName}</div>
          <div className=' text-[19px]'>{userData.headline}</div>
          <div className='text-gray-500 text-[15px]'>{userData.location}</div>
        </div>
        <button className='w-[100%] h-[35px]  my-[20px] mb-[20px]  rounded-full border-2 border-blue-400 text-blue-400 flex justify-center items-center gap-[10px]' onClick={() => { setEdit(true) }}>Edit Profile <HiPencil /></button>



      </div>

      <div className=' w-full lg:w-[50%] min-h-[200px] bg-white shadow-lg'>
        {/* -------------middle div------------- */}



      </div>

      <div className=' w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg'>
        {/* ---------------right div-------------- */}


      </div>
    </div>
  </div>)

}

export default Home
