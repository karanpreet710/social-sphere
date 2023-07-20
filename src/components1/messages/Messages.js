import React from 'react'
import "./messages.scss"
import Message from "../message/Message";

function Messages({messages}) {
  return (
    <div className='messages'>
      {messages.map((message)=>{
        return <Message key = {message.id} message={message}/>
      })}
    </div>
  )
}

export default Messages