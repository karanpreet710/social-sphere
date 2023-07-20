import React, { useState } from 'react'
import "./login.scss"
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import LanguageIcon from '@mui/icons-material/Language';
import Typewriter from "typewriter-effect";
import Register from "../register/Register";

function Login() {

  const [inputs,setInputs] = useState({
    username:"",
    password:""
  });

  const [createNew,setCreateNew] = useState(false);

  const [err,setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  const {login} = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      await login(inputs);
      navigate("/");
    }catch(err){
      setErr(err.response.data);
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    setCreateNew(true);
  }
  
  return (
    <div className="login">
      <div className='card'>
        <div className='left'>
          <div className='intro-wrapper'>
            <LanguageIcon color="primary" sx={{ fontSize: 60 }}/>
            <div className='type-wrapper'>
              <Typewriter
              options={{
                strings: ['Social Sphere'],
                autoStart: true,
                loop: true
              }}
              />
            </div>
          </div>
          <span style={{fontSize:"18px", marginLeft:"60px"}}>Connect and share with the people in your life</span>
        </div>
        <div className='right'>
          <form>
            <input type="text" placeholder='Username' name="username" onChange={handleChange}></input>
            <input type='password' placeholder='Password' name="password" onChange={handleChange}></input>
            {err && err}
            <button onClick={handleLogin}>Log in</button>
            <h4>OR</h4>
            <div style={{textAlign:"center"}}>
              <button style={{backgroundColor:"#05c30c"}} onClick={handleClick}>Create new account</button>
            </div>
          </form>
        </div>  
      </div>
      {createNew && <Register setCreateNew={setCreateNew}/>}
    </div>
  )
}

export default Login