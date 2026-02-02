import React,{useState} from 'react'
import logo2 from "../assets/logo2.png"
import { IoIosSearch } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import userdp from "../assets/userdp.png"
function Nav() {
    let[activeSearch,setActiveScearch]=useState(false);
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
      <div className='flex  items-center justify-center gap-[20px]'>
            <div className='lg:flex items-center justify-center flex-col text-gray-600 hidden '> <IoHome className='w-[20px] h-[20px]'/><div className='font-'>Home</div></div>
            <div className='md:flex items-center justify-center flex-col text-gray-600 hidden '> <FaUsers className='w-[25px] h-[20px]' /><div>My Network</div></div>
            <div className=' flex items-center justify-center flex-col text-gray-600 '><IoNotifications /> <div className='hidden md:block'>Notifications</div></div>
            <div className='rounded-full overflow-hidden '> <img src={userdp} className='w-[40px] bg-transparent'></img></div>
      </div>
    </div>
  )
}

export default Nav
