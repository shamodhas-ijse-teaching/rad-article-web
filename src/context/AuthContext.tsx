import { createContext, useEffect, useState } from "react"
import { getMyDetails } from "../service/auth"

export const AuthContext = createContext<any>(null)

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN")
    if (token) {
      setLoading(true)
      getMyDetails()
        .then((res) => {
          if (res.data) setUser(res.data)
          else setUser(null)
        })
        .catch((err) => {
          console.error(err)
          setUser(null)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
      setUser(null)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
