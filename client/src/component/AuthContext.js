import React, { useContext, useState } from "react"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [firstname, setFirstname] = useState(null)
    const [lastname, setLastname] = useState(null)
    const [profilepic, setProfilepic] = useState(null)
    const filepath = "http://localhost:3001/";

    const value = {
        currentUser, setCurrentUser,
        firstname, setFirstname,
        lastname, setLastname,
        profilepic, setProfilepic,
        filepath
    }
  

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
