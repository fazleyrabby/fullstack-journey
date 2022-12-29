import { useContext } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/authContext";
import "./login.scss"

const Login = () => {
  const {login} = useContext(AuthContext);

  const handleLogin = () => {
    login()
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
            <input type="text" placeholder="Username"/>
            <input type="password" placeholder="Password"/>
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login