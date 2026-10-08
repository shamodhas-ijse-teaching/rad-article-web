import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../service/auth"
import { Button } from "../components/common/Button"
import { InputField } from "../components/forms/InputField"

function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [conPassword, setCOnPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    if (!name || !email || !password || !conPassword)
      return alert("Please fill all fields")
    if (password !== conPassword) return alert("Passwords do not match")

    setLoading(true)
    try {
      await register(name, email, password)
      alert("Registration success")
      navigate("/login")
    } catch (err) {
      alert("Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-5">
        <div className="text-center mb-2">
          <h1 className="text-2xl font-black text-slate-900">Join NexArt</h1>
          <p className="text-xs text-slate-500 mt-1">
            Create your publishing account
          </p>
        </div>

        <InputField
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <InputField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
        />
        <InputField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <InputField
          type="password"
          value={conPassword}
          onChange={(e) => setCOnPassword(e.target.value)}
          placeholder="Confirm Password"
        />

        <Button
          onClick={handleRegister}
          isLoading={loading}
          variant="secondary"
          className="w-full mt-2"
        >
          Register
        </Button>

        <p className="text-xs text-slate-600 text-center mt-2">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 font-bold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  )
}

export default Register
