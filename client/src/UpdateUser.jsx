import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function UpdateUser() {
  const {id} = useParams();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [age,setAge] = useState(0);
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get("http://localhost:3001/getUser/" + id)
    .then(result=>{
      console.log(result.data);
      setName(result.data.name);
      setEmail(result.data.email);
      setAge(result.data.age);
    })
    .catch(err=>console.log(err))
  }, [])

  const Update = (e) => {
    e.preventDefault();
    axios.put("http://localhost:3001/UpdateUser/" + id, {name, email, age})
    .then(result=>{
      console.log(result)
      navigate('/')
    })
    .catch(err=>console.log(err))
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Update}>
          <div className="d-flex align-items-center">
            <h2>Update User</h2>
            <Link to="/" className='btn btn-danger ms-auto'>Back⏎</Link>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input 
              type="number"
              className="form-control"
              id="age"
              placeholder="Enter Age"
              value={age}
              onChange={(e)=>setAge(e.target.value)}
            />
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateUser