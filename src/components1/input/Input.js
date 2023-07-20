import React, { useState } from 'react'
import "./input.scss"
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Input({sendMessage, newMessage, setNewMessage}) {
  const [file, setFile] = useState(null);

  const handleKey = (e) =>{
    e.code==="Enter" && sendMessage({file,setFile})
  }
  return (
    <div className='input'>
      <input type='text' placeholder='Type message...' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={handleKey}></input>
      <div className='send'>
        <input type="file" style={{display:"none"}} id="file" onChange={(e) => setFile(e.target.files[0])}></input>
        <label htmlFor='file'>
          <AddPhotoAlternateOutlinedIcon color="disabled" sx={{fontSize:"35px"}} style={{cursor:"pointer"}}/>
        </label>
        {file && <CheckCircleIcon sx={{fontSize:"18px"}} color="success" style={{position:"absolute", bottom:"14px", right:"85px"}}/>}
        <button onClick={() => sendMessage({file,setFile})} style={{cursor:"pointer"}}>Send</button>
      </div>
    </div>
  )
}

export default Input