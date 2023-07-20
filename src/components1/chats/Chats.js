import React from 'react'
import "./chats.scss"

function Chats({users,onUserClick}) {
  const sortedUsers = users.sort((a, b) => {
    if (a.latestMessage && b.latestMessage) {
      return new Date(b.timestamp) - new Date(a.timestamp);
    } else if (a.latestMessage) {
      return -1;
    } else if (b.latestMessage) {
      return 1;
    }
    return 0;
  });

  return (
    <div className='chats'>
      {sortedUsers.map((user)=>{
        return <div className='userChat' key={user.id} onClick={()=>onUserClick(user)}>
                <img src={user.profilePic} alt=""></img>
                <div className='userChatInfo'>
                  <span>{user.username}</span>
                  <p>{user.latestMessage!==null && user.latestMessage !== '' ? user.latestMessage : user.image!=null ? "Image" : ""}</p>
                </div>
              </div>
      })}
    </div>
  )
}

export default Chats