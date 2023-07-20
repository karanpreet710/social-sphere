import React, { useState, useEffect, useContext } from 'react'
import "./chatting.scss";
import Sidebar from '../../components1/sidebar/Sidebar';
import Chat from '../../components1/chat/Chat';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/authContext';
import io from "socket.io-client"

const socket = io("https://api-socialsphere.vercel.app")


function Chatting() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const {currentUser} = useContext(AuthContext);

  useEffect(()=>{
    const func = async () => {
    const data = await makeRequest.get("/relationships?followerUserId=" + currentUser.id)
    setUsers(data.data.users)
    const rooms = []
    users.forEach((user)=>{
      const roomId = currentUser.id > user.id ? currentUser.id  + "_" + user.id : user.id + "_" + currentUser.id;
      rooms.push(roomId)
    })
    socket.emit('joinRoom',rooms);
  }
  func()
}, [currentUser.id, users]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className='chatting'>
      <div className='container1'>
        <Sidebar users={users} onUserClick={handleUserClick}/>
        {selectedUser && (
        <Chat users={users} setUsers={setUsers} user={selectedUser} roomId={currentUser.id > selectedUser.id ? currentUser.id  + "_" + selectedUser.id : selectedUser.id + "_" + currentUser.id}/>)}
      </div>
    </div>
  )
}

export default Chatting