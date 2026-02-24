import axios from 'axios';
import { authDataContext } from './AuthContext';
import React, { createContext, useState, useContext, useEffect } from 'react'
export const userDataContext = createContext();

function UserContext({ children }) {
  let [userData, setUserData] = useState(null);
  let [edit, setEdit] = useState(false);
  let [postData,setPostData]=useState(null)

  const { serverUrl } = useContext(authDataContext)
 
  const getCurrentUser = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/user/currentuser", { withCredentials: true })
      console.log("----------USER DATA--------")
      console.log(result)
      console.log("--------------------------")
      setUserData(result.data)
    } catch (error) {
      setUserData(null)
      console.log("----------------ERROR AT FETCHING USER DATA-----------------------")
      console.log(error)
       

    }


  };
  async function getPost() {
    try {
      let result = await axios.get(serverUrl + "/api/post/getpost", { withCredentials: true })
      console.log("------ALL POSTS----")
      console.log(result)
      console.log("--------------------")
      setPostData(result.data)
    } catch (error) {
      console.error("Populate failure →", error);
     
    }
  }

    useEffect(() => {
      getPost()
      getCurrentUser()

    }, [])

    const value = { userData, setUserData, edit, setEdit,postData,setPostData,getPost }

    return (
      <div>
        <userDataContext.Provider value={value}>
          {children}
        </userDataContext.Provider>
      </div>
    )
  }

  export default UserContext
