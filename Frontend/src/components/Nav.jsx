import React,{useContext, useState} from 'react'
import logo2 from "../assets/logo2.png"
import { IoIosSearch } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import userdp2 from "../assets/userdp2.png"
import { userDataContext } from '../context/UserContext';
import { authDataContext } from '../context/AuthContext';
import{useNavigate} from "react-router-dom"
import axios from 'axios';
function Nav() {
    let[activeSearch,setActiveScearch]=useState(false);
    let{userData,setUserData}=useContext(userDataContext);
    let{serverUrl}=useContext(authDataContext)
    let[showPopUp,setShowPopUp]=useState(false);
    let navigate=useNavigate();
    const handleSignOut=async ()=>{
      try {
        const result=await axios.get(serverUrl+"/api/auth/logout",{withCredentials:true})
        setUserData(null)
        navigate("/login")
        console.log(result)
      } catch (error) {
        console.log(error)
        
      }
    }
  return (
    <div className='w-full h-[60px] bg-[white] fixed top-0 shadow-lg flex items-center justify-between md:justify-around px-[10px] '>
      <div className=' flex items-center justify-center gap-[10px]'>
            <div>
            <img src={logo2} className='w-[50px]' onClick={()=>{setActiveScearch(false)}}></img>
           </div>
           {!activeSearch && <div><IoIosSearch className='w-[25px] h-[25px] text-gray-800 lg:hidden' onClick={()=>{
                setActiveScearch(e=>!e);
            }}/></div>}
           
            <form className={` w-[200[px]] lg:w-[300px] h-[35px] bg-[#e7e6df] lg:flex items-center rounded-xl gap-[10px] px-[10px] py-[5px] ${!activeSearch?"hidden":"flex"}`}>
                <div><IoIosSearch className='w-[25px] h-[25px] text-gray-800'/></div>
                <input type='text' className='w-[80%] h-full bg-transparent outline-none border-0' placeholder='search users...'></input>
            </form>
      </div>
      <div className='flex  items-center justify-center gap-[20px] relative'>
                  {showPopUp && <div className='w-[250px] min-h-[250px] bg-[white] shadow-lg absolute top-[60px] rounded-lg flex flex-col items-center p-[20px] gap-[10px] py-[10px]'>
                      <div className='rounded-full overflow-hidden'> <img src={userdp2} className='w-[50px] bg-transparent'></img></div>
                      <div className=' text-gray-600 font-semibold font-[19px]'>{userData.firstName } {userData.lastName}</div>
                      <button className='w-[100%] h-[35px] mb-1 rounded-full border-2 border-blue-400 text-blue-400 '>View Profile</button>
                      <div className='w-[100%] h-[1px] bg-gray-400 '></div>
                      <div className='w-[100%] flex items-center justify-start text-gray-600 gap-[10px] py-[5px] mt-[2px]'> <FaUsers className='w-[25px] h-[20px]' /><div>My Network</div></div>
                      <button className='w-[100%] h-[35px]  rounded-full border-2 border-[#e68686] text-[#e68686] ' onClick={handleSignOut}>Sign Out</button>
                  </div>}
            <div className='lg:flex items-center justify-center flex-col text-gray-600 hidden '> <IoHome className='w-[20px] h-[20px]'/><div className='font-'>Home</div></div>
            <div className='md:flex items-center justify-center flex-col text-gray-600 hidden '> <FaUsers className='w-[25px] h-[20px]' /><div>My Network</div></div>
            <div className=' flex items-center justify-center flex-col text-gray-600 '><IoNotifications /> <div className='hidden md:block'>Notifications</div></div>
            <div className='rounded-full overflow-hidden '> <img src={userdp2} className='w-[40px] bg-transparent cursor-pointer' onClick={()=>{setShowPopUp(e=>!e)}}></img></div>
      </div>
    </div>
  )
}

export default Nav
