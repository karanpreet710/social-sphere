import React from 'react'
import "./sidebar.scss"
import Navbar from "../navbar/Navbar"
import Search from "../search/Search"
import Chats from "../chats/Chats"

function Sidebar({users,onUserClick}) {
  return (
    <div className='sidebar'>
      <Navbar/>
      <Search />
      <Chats users={users} onUserClick={onUserClick}/>
    </div>
  )
}

export default Sidebar