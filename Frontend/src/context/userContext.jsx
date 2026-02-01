import React, { createContext } from 'react'
export const userDataContext=createContext();
function userContext(children) {
    const value={

    }
  return (
    <div>
      <userDataContext.Provider value={}>
        {children}
      </userDataContext.Provider>
    </div>
  )
}

export default userContext;
