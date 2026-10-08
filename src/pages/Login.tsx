import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../service/auth"
import { Button } from "../components/common/Button"
import { InputField } from "../components/forms/InputField"

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill all fields")

    setLoading(true)
    try {
      const res = await login(email, password)
      const { access_token, refresh_token } = res.data

      if (!access_token || !refresh_token) throw new Error("Tokens missing")

      localStorage.setItem("ACCESS_TOKEN", access_token)
      localStorage.setItem("REFRESH_TOKEN", refresh_token)

      window.location.href = "/"
    } catch (err) {
      alert("Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-5">
        <div className="text-center mb-2">
          <h1 className="text-2xl font-black text-slate-900">Welcome Back</h1>
          <p className="text-xs text-slate-500 mt-1">
            Sign in to your NexArt account
          </p>
        </div>

        <InputField
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          onClick={handleLogin}
          isLoading={loading}
          className="w-full mt-2"
        >
          Sign In
        </Button>

        <p className="text-xs text-slate-600 text-center mt-2">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 font-bold hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
