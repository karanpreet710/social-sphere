import React, { useEffect, useState } from 'react'
import "./search.scss"

function Search({ users, setSearchResults }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    let results = [];
    if(username) {
      results = users.filter(user =>
        user.username.toLowerCase().startsWith(username.toLowerCase())
      );
    } else {
      results = users;
    }
    setSearchResults(results);
  }, [username, users]);

  return (
    <div className='search'>
      <div className='searchForm'>
        <input type='text' placeholder='Find a user' onChange={e=>setUsername(e.target.value)}></input>
      </div>
    </div>
  );
}

export default Search;
