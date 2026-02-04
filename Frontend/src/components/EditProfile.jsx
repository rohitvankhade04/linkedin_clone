import React, { useContext, useState } from 'react';
import { RxCrossCircled } from "react-icons/rx";
import { userDataContext } from '../context/UserContext';
import userdp2 from "../assets/userdp2.png"
import { FaPlus } from "react-icons/fa6";
import { IoCameraOutline } from "react-icons/io5";


function EditProfile() {
  let { edit, setEdit, userData, setUserData } = useContext(userDataContext)
  let [firstName, setFirstName] = useState(userData.firstName || "")
  let [lastName, setLastName] = useState(userData.lastName || "")
  let [userName, setUserName] = useState(userData.userName || "")
  let [loaction, setLocation] = useState(userData.location || "")
  let [headline, setHeadline] = useState(userData.headline || "")
  let [gender, setGender] = useState(userData.firstName.gender || "")
  let [skills, setSkills] = useState(userData.skills || [])
  let [newSkills, setNewSkills] = useState()
 
  function addSkill(e){
    e.preventDefault()
    if(newSkills && !skills.includes(newSkills)){
      setSkills(...skills,newSkills)
    }
    setNewSkills("");
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">


      <div className="absolute inset-0 bg-black opacity-50" onClick={() => { setEdit(false) }}></div>


      <div className="relative z-[200] w-[400px] h-[600px] bg-white rounded-lg shadow-lg px-[16px] overflow-auto">
        <RxCrossCircled className="absolute top-[5px] right-[5px] w-[20px] h-[20px] text-gray-600 cursor-pointer " onClick={() => { setEdit(false) }} />
        <div className='w-full h-[150px] bg-gray-500 rounded-lg mt-[30px]'>
          <img src='' alt="" className='w-full'></img>
          <IoCameraOutline className='absolute right-[18px] top-[35px] h-[22px] w-[22px]  cursor-pointer text-white' />

        </div>
        <div className=' w-[80px] h-[80px] rounded-full overflow-hidden items-center justify-center relative left-[30px] top-[-45px] cursor-pointer' onClick={() => { setEdit(true) }}>
          <img src={userdp2} className='h-full bg-transparent'></img>
        </div>
        <div className='w-[15px] h-[15px] bg-blue-400 absolute top-[180px] left-[109px] rounded-full flex items-center justify-center'>
          <FaPlus className='text-white cursor-pointer' onClick={() => { setEdit(true) }} />
        </div>
        <form className='w-full flex flex-col justify-center items-center gap-[10px] mb-[20px] '>
          < input type="text" placeholder="firstName" className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border rounded-lg' value={firstName} onChange={e => setFirstName(e.target.value)} />
          < input type="text" placeholder="lastName" className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border rounded-lg' value={lastName} onChange={e => setLastName(e.target.value)} />
          < input type="text" placeholder="userName" className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border rounded-lg' value={userName} onChange={e => setUserName(e.target.value)} />
          < input type="text" placeholder="headline" className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border rounded-lg' value={headline} onChange={e => setHeadline(e.target.value)} />
          < input type="text" placeholder="location" className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border rounded-lg' value={loaction} onChange={e => setLocation(e.target.value)} />
          < input type="text" placeholder="gender(male/female/others)" className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border rounded-lg' value={gender} onChange={e => setGender(e.target.value)} />


          <div className='w-full p-[10px] border rounded-lg border-gray-600 flex flex-col gap-[3px]'>
           <h1 className='text-[19px] font-semibold'>skills</h1>
           {skills && <div> {skills.map((skill,index)=>(<div id='index'>{skill}</div>))}</div>}
           <form className='flex  flex-col items-start justify-center gap-[10px] '>
            <input type='text' placeholder='add new skill..' value={newSkills} onChange={(e)=>setNewSkills(e.target.value)} className=' px-[10px] py-[5px] border outline-none rounded-lg border-gray-600 text-[18px] w-full'/>
            <button className=' w-[60px] h-[40px] bg-blue-400 text-white rounded-md shadow-lg border border-gray-700'>Add</button>
           </form>
          </div>
        </form>
      </div>

    </div>
  );
}

export default EditProfile;

