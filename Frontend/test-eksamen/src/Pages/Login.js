import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <form className="FormBox login" onSubmit={handleSubmit}>
      <h3 className="FormTitle">Log In</h3>
      
      <label className="FormLabel">Email address:</label>
      <input 
        type="email" 
        className="FormInput"
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label className="FormLabel">Password:</label>
      <input 
        type="password" 
        className="FormInput"
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button className="FormButton" disabled={isLoading}>Log in</button>
      {error && <div className="FormError">{error}</div>}
    </form>
  )
}

export default Login