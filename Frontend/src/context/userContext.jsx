import axios from 'axios';
import { authDataContext } from './AuthContext';
import React, { createContext,useState,useContext, useEffect } from 'react'
export const userDataContext=createContext();

function UserContext({children}) {
    let[userData,setUserData]=useState(null);
   let[edit,setEdit]=useState(false);

    const {serverUrl}=useContext(authDataContext)
    const getCurrentUser=async ()=>{
     try {
            const result=await axios.get(serverUrl+"/api/user/currentuser",{withCredentials:true})
            console.log(result)
            setUserData(result.data)
        } catch (error) {
            setUserData(null)
            
        }
 

    }
    useEffect(()=>{
        getCurrentUser()
    },[])

    const value={userData,setUserData,edit,setEdit}

   return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext;
