import React, { useContext } from 'react'
import "./navbar.scss"
import {AuthContext} from "../../context/authContext"
import { Link } from "react-router-dom";

function Navbar() {

  const {currentUser} = useContext(AuthContext);
  return (
    <div className='navbar'>
      <span className='logo'>Chat</span>
      <div className='user'>
        <img src={currentUser.profilePic} alt=""></img>
        <span>{currentUser.username}</span>
        <Link to="/">
          <button>Home</button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar