import { useRef, useState } from "react";
import { Link } from "react-router-dom"
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = useStateContext()

  const onSubmit = (ev) => {
    ev.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    setErrors({});

    axiosClient.post('/login', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          if(response.data.errors) {
            setErrors(response.data.errors)
          }else{
            setErrors({
              email: [ response.data.message ]
            })
          }
        }
      })
  }
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login</h1>
          <input ref={emailRef} placeholder="Email" type="text" />
          {errors && errors.email && <div className="alert-inline">{errors.email[0]}</div>}
          <input ref={passwordRef} placeholder="Password" type="password" />
          {errors && errors.password && <div className="alert-inline">{errors.password[0]}</div>}
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not Registered? <Link to="/signup">Create an account!</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
