import React, { useState } from 'react'
import "./register.scss"
import { Link } from 'react-router-dom'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';

function Register({setCreateNew}) {

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
      // await axios.post("https://api-socialsphere.vercel.app/api/auth/register",inputs)
      await axios.post("https://api-socialsphere.vercel.app/api/auth/register",inputs)
    }catch(err){
      setErr(err.response.data);
    }
  }

  return (
    <div className="register">
      <div className='card'>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <h1>Sign Up</h1>
          <CloseIcon onClick={()=>setCreateNew(false)} style={{cursor:"pointer"}}/>
        </div>
          {/* <hr style={{width:"120%", margin:"10px 0px", position:"relative",left:"-20px"}}/> */}
          <form>
            <input type="text" placeholder='Username' name="username" onChange={handleChange}></input>
            <input type='email' placeholder='Email' name="email" onChange={handleChange}></input>
            <input type='password' placeholder='Password' name="password" onChange={handleChange}></input>
            <input type='text' placeholder='Name' name="name" onChange={handleChange}></input>
            {err && err}
            <div style={{textAlign:"center"}}>
              <button onClick={handleClick} style={{backgroundColor:"#05c30c", borderRadius:"10px", padding: "10px", margin:"8px"}}>Sign Up</button>
            </div>
          </form>
      </div>
    </div>
  )
}

export default Register