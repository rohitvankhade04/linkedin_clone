import React, { useContext, useState,useRef} from 'react';
import { RxCrossCircled } from "react-icons/rx";
import { userDataContext } from '../context/UserContext';
import userdp2 from "../assets/userdp2.png"
import { FaPlus } from "react-icons/fa6";
import { IoCameraOutline } from "react-icons/io5";
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';


function EditProfile() {
  let { edit, setEdit, userData, setUserData } = useContext(userDataContext)
  let{serverUrl}=useContext(authDataContext)
  let [firstName, setFirstName] = useState(userData.firstName || "")
  let [lastName, setLastName] = useState(userData.lastName || "")
  let [userName, setUserName] = useState(userData.userName || "")
  let [location, setLocation] = useState(userData.location || "")
  let [headline, setHeadline] = useState(userData.headline || "")
  let [gender, setGender] = useState(userData.gender || "")
  let [skills, setSkills] = useState(userData.skills || [])
  let [newSkills, setNewSkills] = useState("")
  let [education, setEducation] = useState(userData.education || [])
  let [newEducation, setNewEducation] = useState({
    college: "",
    degree: "",
    specification: ""
  })
  let [experience, setExperience] = useState(userData.experience || [])
  let [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    description: ""
  })
  let [frontendProfileImage,setFrontendProfileImage]=useState(userData.profileImage || userdp2)
  let [backendProfileImage,setBackendProfileImage]=useState(null)
  let [frontendCoverImage,setFrontendCoverImage]=useState(userData.coverImage || userdp2)
  let [backendCoverImage,setBackendCoverImage]=useState(null)
  let [saving,setSaving]=useState(false)

  const profileImage=useRef()
  const coverImage=useRef()
//  ---------------------------------imports and States ends here----------------------------------
// ------------------------------------functions starts here------------------------------------------

  function addSkill(e) {
    e.preventDefault()
    if (newSkills && !skills.includes(newSkills)) {
      setSkills([...skills, newSkills])
    }
    setNewSkills("");
  }
  function clearskill(skill) {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill))

    }

  }
  function addEducation(e) {
    e.preventDefault();
    if (newEducation.college && newEducation.degree && newEducation.specification) {
      setEducation([...education, newEducation])
    }
    setNewEducation({
      college: "",
      degree: "",
      specification: ""
    })

  }
  function clearEducation(edu) {
    if (education.includes(edu)) {
      setEducation(education.filter((s) => s !== edu))

    }

  }

  function addExperience(e) {
    e.preventDefault();
    if (newExperience.title && newExperience.company && newExperience.description) {
      setExperience([...experience, newExperience])
    }
    setNewExperience({
      title: "",
      company: "",
      description: ""
    })

  }
  function clearExperience(exp) {
    if (experience.includes(exp)) {
      setExperience(experience.filter((s) => s !== exp))

    }

  }

  function handleCoverImage(e){
    let file=e.target.files[0]
    setBackendCoverImage(file)
    setFrontendCoverImage(URL.createObjectURL(file))

    
  }
  function handleProfileImage(e){
    let file=e.target.files[0]
    setBackendProfileImage(file)
    setFrontendProfileImage(URL.createObjectURL(file))
  }


  const handleSaveProfile=async ()=>{
    setSaving(true);
    try {
      let formdata=new FormData()
      formdata.append("firstName",firstName)
      formdata.append("lastName",lastName)
      formdata.append("userName",userName)
      formdata.append("headline",headline)
      formdata.append("location",location)
      formdata.append("gender", gender)
      formdata.append("skills",JSON.stringify(skills))
      formdata.append("education",JSON.stringify(education))
      formdata.append("experience",JSON.stringify(experience))
      if(backendProfileImage){
        formdata.append("profileImage",backendProfileImage)
      }
      if(backendCoverImage){
        formdata.append("coverImage",backendCoverImage)
      }
      
      let result =await axios.put(serverUrl+"/api/user/updateProfile",formdata,{withCredentials:true})
      console.log(result)
      let message="profile updated"
      setUserData(result.data)
      setSaving(false)
      setEdit(false)

      
    } catch (error) {
      console.log(error);
      setSaving(false)
      
    }
  }

// ------------------------------------functions ends here------------------------------------------
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* -------------image taking front front end--------- */}
      <input type='file' accept="image/*" hidden ref={profileImage} onChange={handleProfileImage} />
      <input type='file' accept="image/*" hidden ref={coverImage} onChange={handleCoverImage}/>
      {/* -------------image taking front front end--------- */}

      <div className="absolute inset-0 bg-black opacity-50" onClick={() => { setEdit(false) }}></div>


      <div className="relative z-[200] w-[400px] h-[600px] bg-white rounded-lg shadow-lg px-[16px] overflow-auto">
        <RxCrossCircled className="absolute top-[5px] right-[5px] w-[20px] h-[20px] text-gray-600 cursor-pointer " onClick={() => { setEdit(false) }} />
        <div className='w-full h-[150px] bg-gray-500 rounded-lg mt-[30px] cursor-pointer overflow-hidden' onClick={()=>coverImage.current.click()}>
          <img src={frontendCoverImage} alt="" className='w-full'></img>
          <IoCameraOutline className='absolute right-[18px] top-[35px] h-[22px] w-[22px]  cursor-pointer text-white' />

        </div>
        <div className=' w-[80px] h-[80px] rounded-full overflow-hidden items-center justify-center relative left-[30px] top-[-45px] cursor-pointer' onClick={()=>profileImage.current.click()}>
          <img src={frontendProfileImage} className='h-full bg-transparent'></img>
        </div>
        <div className='w-[15px] h-[15px] bg-blue-400 absolute top-[182px] left-[115px] rounded-full flex items-center justify-center'>
          <FaPlus className='text-white cursor-pointer' onClick={() => { setEdit(true) }} />
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-[10px] mb-[20px] '>
          < input type="text" placeholder="firstName" className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border rounded-lg' value={firstName} onChange={e => setFirstName(e.target.value)} />
          < input type="text" placeholder="lastName" className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border rounded-lg' value={lastName} onChange={e => setLastName(e.target.value)} />
          < input type="text" placeholder="userName" className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border rounded-lg' value={userName} onChange={e => setUserName(e.target.value)} />
          < input type="text" placeholder="headline" className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border rounded-lg' value={headline} onChange={e => setHeadline(e.target.value)} />
          < input type="text" placeholder="location" className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border rounded-lg' value={location} onChange={e => setLocation(e.target.value)} />
          < input type="text" placeholder="gender(male/female/others)" className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border rounded-lg' value={gender} onChange={e => setGender(e.target.value)} />


          <div className='w-full min-h-[50px] p-[10px] border rounded-lg border-gray-600 flex flex-col gap-[3px]'>
            <h1 className='text-[19px] font-semibold'>skills</h1>
            {skills && <div className=' flex flex-col gap-[8px] p-[10px]'> {skills.map((skill, index) => (
              <div key={index + 1} className='w-full h-[40px] border border-gray-600 bg-gray-200 rounded-lg shadow-lg px-2 flex items-center justify-between'>
                <span>{skill}</span>
                <RxCrossCircled className="w-[20px] h-[20px] text-gray-600 cursor-pointer " onClick={() => { clearskill(skill) }} />
              </div>))}</div>}
            <div className='flex  flex-col items-start justify-center gap-[10px] '>
              <input type='text' placeholder='add new skill..' value={newSkills} onChange={(e) => setNewSkills(e.target.value)} className=' px-[10px] py-[5px] border outline-none rounded-lg border-gray-600 text-[18px] w-full' />
              <button className=' w-[60px] h-[40px] ml-[130px] bg-blue-400 text-white rounded-md shadow-lg border border-gray-700' onClick={addSkill}>Add</button>
            </div>
          </div>



          <div className='w-full min-h-[50px] p-[10px] border rounded-lg border-gray-600 flex flex-col gap-[3px]'>
            <h1 className='text-[19px] font-semibold'>Education</h1>
            {education && <div className='  flex flex-col gap-[8px] p-[10px]'> {education.map((edu, index) => (
              <div key={index + 1} className='w-full min-h-[40px] border border-gray-600 bg-gray-200 rounded-lg shadow-lg px-2 flex items-center justify-between py-[10px]'>

                <div>
                  <div>College:{edu.college}</div>
                  <div>Degree:{edu.degree}</div>
                  <div>Specification:{edu.specification}</div>
                </div>

                <RxCrossCircled className="w-[20px] h-[20px] text-gray-600 cursor-pointer " onClick={() => { clearEducation(edu) }} />
              </div>))}</div>}
            <div className='flex  flex-col items-start justify-center gap-[10px] '>
              <input type='text' placeholder='college' value={newEducation.college} onChange={(e) => setNewEducation({ ...newEducation, college: e.target.value })} className=' px-[10px] py-[5px] border outline-none rounded-lg border-gray-600 text-[18px] w-full' />
              <input type='text' placeholder='degree' value={newEducation.degree} onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })} className=' px-[10px] py-[5px] border outline-none rounded-lg border-gray-600 text-[18px] w-full' />
              <input type='text' placeholder='specification' value={newEducation.specification} onChange={(e) => setNewEducation({ ...newEducation, specification: e.target.value })} className=' px-[10px] py-[5px] border outline-none rounded-lg border-gray-600 text-[18px] w-full' />
              <button className=' w-[60px] h-[40px] ml-[130px] bg-blue-400 text-white rounded-md shadow-lg border border-gray-700' onClick={addEducation}>Add</button>
            </div>
          </div>




          <div className='w-full min-h-[50px] p-[10px] border rounded-lg border-gray-600 flex flex-col gap-[3px]'>
            <h1 className='text-[19px] font-semibold'>Experience</h1>
            {experience && <div className='  flex flex-col gap-[8px] p-[10px]'> {experience.map((exp, index) => (
              <div key={index + 1} className='w-full min-h-[40px] border border-gray-600 bg-gray-200 rounded-lg shadow-lg px-2 flex items-center justify-between py-[10px]'>

                <div>
                  <div>Title:{exp.title}</div>
                  <div>Company:{exp.company}</div>
                  <div>Description:{exp.description}</div>
                </div>

                <RxCrossCircled className="w-[20px] h-[20px] text-gray-600 cursor-pointer " onClick={() => { clearExperience(exp) }} />
              </div>))}</div>}
            <div className='flex  flex-col items-start justify-center gap-[10px] '>
              <input type='text' placeholder='title' value={newExperience.title} onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })} className=' px-[10px] py-[5px] border outline-none rounded-lg border-gray-600 text-[18px] w-full' />
              <input type='text' placeholder='company' value={newExperience.company} onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })} className=' px-[10px] py-[5px] border outline-none rounded-lg border-gray-600 text-[18px] w-full' />
              <input type='text' placeholder='description' value={newExperience.description} onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })} className=' px-[10px] py-[5px] border outline-none rounded-lg border-gray-600 text-[18px] w-full' />
              <button className=' w-[60px] h-[40px] ml-[130px] bg-blue-400 text-white rounded-md shadow-lg border border-gray-700' onClick={addExperience}>Add</button>
            </div>
          </div>

          <button className='bg-blue-500  h-[50px] rounded-full w-[100%] mt-[40px] text-white'  disabled={saving} onClick={handleSaveProfile} > {saving ?"saving...":"Save Profile"}</button>
        </div>
      </div>

    </div>
  );
}

export default EditProfile;

