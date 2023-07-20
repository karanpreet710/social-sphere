import React, { useContext, useState } from 'react'
import "./search.scss"
import {makeRequest} from "../../axios"
import { AuthContext } from '../../context/authContext';

function Search() {
  const [username,setUsername] = useState("");
  const [user,setUser] = useState(null);
  const [err,setErr] = useState(false); 
  const {currentUser} = useContext(AuthContext);

  const handleSearch = async () => {
    try{
      const res = await makeRequest.get("/relationships?followedUsername=" + username)
      for (let obj of res.data){
        if(obj.followerUserId===parseInt(currentUser.id)){
          setUser({id:obj.id,username,profilePic:obj.profilePic});
          break;
        }
      }
    }catch(err){
      setErr(true)
    }
  }

  const handleKey = (e) =>{
    e.code==="Enter" && handleSearch()
  }

  const handleSelect = () => {
    const combinesId = currentUser.id > user.id ? currentUser.id + "_" + user.id : user.id + "_" + currentUser.id;
    
  }

  return (
    <div className='search'>
      <div className='searchForm'>
        <input type='text' placeholder='Find a user' onKeyDown={handleKey}  onChange={e=>setUsername(e.target.value)}></input>
      </div>
      {err && <span>User not found!</span>}
      {user && <div className='userChat' onClick={handleSelect}>
        <img src={user.profilePic} alt=""></img>
        <div className='userChatInfo'>
          <span>{user.username}</span>
        </div>
      </div>}
    </div>
  ) 
}

export default Search