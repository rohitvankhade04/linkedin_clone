import React from 'react';
import Nav from '../components/nav';
import userdp2 from "../assets/userdp2.png"
import { CiCirclePlus } from "react-icons/ci";
// import { FaPlus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";


function Home() {
  return (
    <div className='w-full min-h-[100vh] bg-[#e7e6df] pt-[80px] flex items-start justify-center gap-[20px]  px-[20px] flex-col lg:flex-row'>
      <Nav/>
      <div className=' w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg rounded-lg p-[10px] relative' >
      {/* -------------left div------------- */}
        <div className='w-[100%] h-[100px] bg-gray-500 rounded overflow-hidden items-center justify-center'>
          <img src="" alt="" className='w-full'/>
          
        </div>
        <div className=' w-[70px] h-[70px] rounded-full overflow-hidden items-center justify-center relative left-[30px] top-[-45px]'> 
          <img src={userdp2} className='h-full bg-transparent'></img>
          
        </div>
        <div className='w-[18px] h-[18px] bg-blue-400 absolute top-[105px] left-[90px] rounded-full flex items-center justify-center'>
            <FaPlus />
          </div>

      </div>

      <div className=' w-full lg:w-[50%] min-h-[200px] bg-white shadow-lg'>
      {/* -------------middle div------------- */}



      </div>

      <div className=' w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg'>
      {/* ---------------right div-------------- */}


      </div>
    </div>
  )
}

export default Home
