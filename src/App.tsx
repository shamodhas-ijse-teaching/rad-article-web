import AuthProvider from "./context/AuthContext"
import Router from "./router"

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App
