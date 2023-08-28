import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase/firebaseAuth'


const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider( {children} ) {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function loginCheck() {
    console.log(currentUser?.email)
    if (!currentUser) navigate('/login')
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loginCheck
  }
  
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
