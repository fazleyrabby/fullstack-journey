import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [errors, setErrors] = useState(null);

  const { setUser, setToken } = useStateContext()

  const onSubmit = (ev) => {
    ev.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmRef.current.value,
    }

    axiosClient.post('/signup', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Register</h1>
          {/* {errors && 
            <div className="alert"> 
              { Object.keys(errors).map(key => (
                  <p key={key}>{errors[key][0]}</p>
                  )) 
              }
            </div>
          } */}
          <input ref={nameRef} placeholder="Full Name" type="text" />
          {errors && errors.name && <div className="alert-inline">{errors.name[0]}</div>}
          <input ref={emailRef} placeholder="Email" type="email" />
          {errors && errors.email && <div className="alert-inline">{errors.email[0]}</div>}
          <input ref={passwordRef} placeholder="Password" type="password" />
          {errors && errors.password && <div className="alert-inline">{errors.password[0]}</div>}
          <input ref={passwordConfirmRef} placeholder="Password Confirmation" type="password" />
          {errors && errors.password_confirmed && <div className="alert-inline">{errors.password_confirmed[0]}</div>}
          <button className="btn btn-block">Signup</button>
          <p className="message">
            Already Registered? <Link to="/login">Login!</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
