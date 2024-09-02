import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Users() {
  const [users, setUsers] = useState([{
    Name: "Ram", Email: "sample@email.com", Age: 25
  }]);
  useEffect(()=>{
    axios.get("http://localhost:3001/")
    .then(result=>setUsers(result.data))
    .catch(err=>console.log(err))
  }, [])

  const HandleDelete = (id) => {
    axios.delete("http://localhost:3001/DeleteUser/" + id)
    .then(result=>{
      console.log(result)
      window.location.reload()
    })
    .catch(err=>console.log(err))
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <div className="d-flex">
          <Link to="/create" className='btn btn-success ms-auto'>Add +</Link>
        </div>
        <div className='table-responsive'>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Commands</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user, key)=>{
                  return (
                    <tr key={key} >
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.age}</td>
                      <td>
                        <Link to={`/update/${user._id}`} className='btn btn-warning'>Edit</Link>
                        <button
                          className='btn btn-danger'
                          onClick={(e)=>HandleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Users