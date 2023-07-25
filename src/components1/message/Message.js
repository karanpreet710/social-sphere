import React, { useContext, useEffect, useRef } from 'react'
import "./message.scss"
import { AuthContext } from '../../context/authContext'
import moment from 'moment';

function Message({message}) {
  const {currentUser} = useContext(AuthContext);
  const ref = useRef()
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  },[])
  return (
    <div key={message.id} ref={ref} className={message.userId===currentUser.id ? 'message owner' : 'message'}>
      <div className='messageInfo'>
        <img src={message.profilePic} alt=""></img>
        <span>{moment(message.timestamp).utc().fromNow()}</span>
      </div>
      <div className='messageContent'>
        {message.content && <p>{message.content}</p>}
        {message.image && <img src={message.image} alt=""></img>}
      </div>
    </div>
  )
}

export default Message