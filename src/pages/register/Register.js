import React, { useState } from 'react'
import "./register.scss"
import { Link } from 'react-router-dom'
import axios from 'axios'

function Register() {

  const [inputs,setInputs] = useState({
    username:"",
    email:"",
    password:"",
    name:""
  });

  const [err,setErr] = useState(null);

  const handleChange = e => {
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  const handleClick = async e => {
    e.preventDefault();
    try{
      await axios.post("https://socialsphere-backend.onrender.com/api/auth/register",inputs)
    }catch(err){
      setErr(err.response.data);
    }
  }

  return (
    <div className="register">
      <div className='card'>
        <div className='left'>
          <h1>Hello World.</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.</p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className='right'>
          <h1>Register</h1>
          <form>
            <input type="text" placeholder='Username' name="username" onChange={handleChange}></input>
            <input type='email' placeholder='Email' name="email" onChange={handleChange}></input>
            <input type='password' placeholder='Password' name="password" onChange={handleChange}></input>
            <input type='text' placeholder='Name' name="name" onChange={handleChange}></input>
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register