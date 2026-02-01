import React, { useState ,useContext} from 'react'
import { useNavigate} from 'react-router-dom'
import { authDataContext } from '../context/AuthContext';
import axios from "axios";
import { userDataContext } from '../context/userContext';
function Signup() {
  const[show,setShow]=useState(false);
  const {serverUrl}=useContext(authDataContext)
  const navigate=useNavigate();
  const[loading,setLoading]=useState(false);
  let[err,setError]=useState("");
  let{userData,setUSerData}=useContext(userDataContext)

  let[firstName,setFirstName]=useState("")
  let[lastName,setLastName]=useState("")
  let[email,setEmail]=useState("")
  let[userName,setUserName]=useState("")
  let[password,setPassword]=useState("")


  const handleSignUp=async (e)=>{
    e.preventDefault();
    setLoading((e)=>!e);
    try {
      let result=await axios.post(serverUrl+"/api/auth/signup",{
        firstName,
        lastName,
        email,
        userName,
        password
      },{withCredentials:true})
      console.log(result)
      navigate("/")
      setUSerData(result)
      setLoading((e)=>!e);
      setError("");
      setFirstName("")
      setLastName("")
      setEmail("")
      setUserName("")
      setPassword("")
    } catch (error) {
      setError(error.response.data.message)
      setLoading((e)=>!e);

    }
  }
  return (
    <div className='w-full h-screen bg-white relative'>
      <div className='absolute top-3 left-6 w-[100px] '>
        <img src="https://1000logos.net/wp-content/uploads/2023/01/LinkedIn-logo.png" atl="Linkedin" />
      </div>
      <div className='flex items-center justify-center h-full pt-10 '>
        <form className='w-[90%] max-w-[400px] h-[600px] shadow-2xl flex flex-col  justify-center gap-[10px] p-[15px]' onSubmit={handleSignUp}>
          <h1 className=' mb-[30px] text-gray-800 text-[30px]  font-semibold'>Sign Up</h1>
          <input className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[20px] px-[15px] py-[10px] rounded-md' type='text' placeholder='First Name' required value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
          <input className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[20px] px-[15px] py-[10px] rounded-md' type='text' placeholder='Last Name' required value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
          <input className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[20px] px-[15px] py-[10px] rounded-md' type='email' placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[20px] px-[15px] py-[10px] rounded-md' type='text' placeholder='Username' required value={userName} onChange={(e)=>setUserName(e.target.value)}/>
          <div className='w-[100%] h-[50px] border-2 border-gray-600 px-[15px] py-[10px] rounded-md relative flex items-center'>
            <input className=' text-gray-800 text-[20px] w-full h-full border-none pr-[50px] outline-none focus:outline-none focus:ring-0' type={show?"text":"password"} placeholder='Password' required  value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <span onClick={()=>setShow(prev=>!prev)} className='text-blue-600 absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer font-semibold'>{show?"hide":"show"}</span>
          </div>
          {err && <p className='text-center text-red-500'>*{err}
            </p>}
          <button className='bg-blue-500  h-[50px] rounded-full w-[100%] mt-[40px] text-white' >{loading?"loading...":"Sign Up"}</button>
          <p className='flex justify-center gap-1 cursor-pointer' onClick={()=>navigate("/Login")}>Already have an account?<span className=' text-blue-700'>Sign In</span></p>
          
        </form>
      </div>
    </div>
  );
}

export default Signup
