import { useState } from "react"
import { Link } from "react-router-dom"
import "./register.scss"
import axios from "axios"
import { makeRequest } from "../../axios"

const Register = () => {
  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    password:"",
    name:"",
  })

  const [err, setErr] = useState(null)

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = makeRequest.post("/auth/register", inputs)
    } catch (error) {
      setErr(error.response.data)
    }
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lorem Social!</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto tempore ducimus inventore repudiandae doloremque, tempora corporis nesciunt error rerum quibusdam!</p>
          <span>Do you have an account?</span>
          <Link to="/login"><button>Login</button></Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
          {err && <small style={{ color:"red" }}>{err}</small>}
            <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
            <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
            <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            <button onClick={handleSubmit}>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register