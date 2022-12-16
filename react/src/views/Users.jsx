import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import Pagination from "../components/Pagiantion";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getUsers();
  }, []);

  const callback = (payload) => {
    setUsers(payload.data)
    setLinks(payload.meta)
  }

  const getUsers = () => {
    setLoading(true);
    axiosClient.get('/users')
      .then(({ data }) => {
        setLoading(false)
        setUsers(data.data)
        setLinks(data.meta)
      })
      .catch(() => {
        setLoading(false)
    })
  }

  const onDelete = (user) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        //TODO show notification
        getUsers()
      })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
        <h1>Users</h1>
        <Link className="btn-add" to="/users/new">Add New</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading &&
            <tbody>
              <tr>
                <td colSpan={5} className="text-center">Loading...</td>
              </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.created_at}</td>
                  <td>
                    <Link className="btn-edit" to={'/users/' + user.id}>Edit</Link>
                    &nbsp;
                    <button onClick={ev => onDelete(user)} className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </table>
        <br></br>
        <Pagination links={links} callback={callback}/>
      </div>
    </div>
  )
}
