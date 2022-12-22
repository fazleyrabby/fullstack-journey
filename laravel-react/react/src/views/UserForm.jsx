import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function UserForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const {setNotification} = useStateContext();
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })

  const onSubmit = (e) => {
    e.preventDefault()
    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          setNotification('User updated successfully!')
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post(`/users/`, user)
        .then(() => {
          setNotification('User created successfully!')
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false)
          setUser(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])

  }
  return (
    <div>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">Loading...</div>
        )}

        {!loading &&

          <form onSubmit={onSubmit}>
            <input value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} type="text" placeholder="Name" />

            {errors && errors.name && <div className="alert-inline">{errors.name[0]}</div>}

            <input value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} type="email" placeholder="Email" />

            {errors && errors.email && <div className="alert-inline">{errors.email[0]}</div>}

            <input type="password" onChange={e => setUser({ ...user, password: e.target.value })} placeholder="Password" />

            {errors && errors.password && <div className="alert-inline">{errors.password[0]}</div>}

            <input type="password" onChange={e => setUser({ ...user, password_confirmation: e.target.value })} placeholder="Password Confirmation" />

            {errors && errors.password_confirmed && <div className="alert-inline">{errors.password_confirmed[0]}</div>}

            <button className="btn">Save</button>
          </form>

        }
      </div>
    </div>
  )
}
