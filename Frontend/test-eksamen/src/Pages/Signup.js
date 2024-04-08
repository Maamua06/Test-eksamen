import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <form className="FormBox signup" onSubmit={handleSubmit}>
      <h3 className="FormTitle">Sign Up</h3>
      
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

      <button className="FormButton" disabled={isLoading}>Sign up</button>
      {error && <div className="FormError">{error}</div>}
    </form>
  )
}

export default Signup