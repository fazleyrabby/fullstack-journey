import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext";
import "./login.scss"

const Login = () => {
  const {login} = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    username:"",
    password:"",
  })

  const [err, setErr] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate("/")
    } catch (error) {
      setErr(error.response.data)
    }
    
  }


  return (
    <div className="login">
      <div className="card">  
        <div className="left">
          <h1>Hello There!</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto tempore ducimus inventore repudiandae doloremque, tempora corporis nesciunt error rerum quibusdam!</p>
          <span>Don't have account?</span>
          <Link to="/register"><button>Register</button></Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            {err && <small style={{ color:"red" }}>{err}</small>}
            <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login