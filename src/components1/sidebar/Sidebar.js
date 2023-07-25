import React, { useState, useEffect } from 'react'
import "./sidebar.scss"
import Navbar from "../navbar/Navbar"
import Search from "../search/Search"
import Chats from "../chats/Chats"

function Sidebar({ users, onUserClick }) {
  const [searchResults, setSearchResults] = useState(users);

  useEffect(() => {
    setSearchResults(users);
  }, [users]);

  return (
    <div className='sidebar'>
      <Navbar/>
      <Search users={users} setSearchResults={setSearchResults}/>
      <Chats users={searchResults} onUserClick={onUserClick}/>
    </div>
  );
}

export default Sidebar;
