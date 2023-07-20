import React, { useContext } from 'react'
import "./chat.scss"
import Messages from '../messages/Messages'
import Input from "../input/Input"
import { useState, useEffect } from 'react'
import {makeRequest} from "../../axios"
import io from "socket.io-client";
import { AuthContext } from '../../context/authContext'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'

const socket = io("https://api-socialsphere.vercel.app")

function Chat({users, setUsers, user, roomId}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const {currentUser} = useContext(AuthContext)
  const [timeUpdated, setTimeUpdated] = useState(false);
  // const roomId = currentUser.id > user.id ? currentUser.id  + "_" + user.id : user.id + "_" + currentUser.id;
  useEffect(() => {
  const func = async () => {
    // Fetch messages for the selected user from the server
    // You need to implement the API endpoint on the server side to retrieve messages for a specific user
    const data = await makeRequest(`/messages?user=${currentUser.id}&otherUser=${user.id}`)
    setMessages(data.data.messages)
  }
  func()

  const interval = setInterval(() => {
    setTimeUpdated((prevValue) => !prevValue);
  }, 1000);

  socket.emit('joinRoom', roomId);

  socket.on('message', (message) => {
    console.log(message)
    const userIndex = users.findIndex((u) => u.id === user.id);

    // If the user is found, update their latestMessage
    if (userIndex !== -1) {
      const updatedUsers = [...users]; // Create a copy of the users array
      updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
        timestamp: message.timestamp,
        latestMessage: message.content, // Replace with the updated message
      };
      
      // Set the updated users array in your state or pass it as a prop to the ChatList component
      setUsers(updatedUsers); // Replace with your state update method or prop assignment
    }
    setMessages((prevMessages) => {
      // Check if the message already exists in the local state
      const messageExists = prevMessages.some((msg) => msg.id === message.id);
  
      if (!messageExists) {
        return [...prevMessages, message];
      }
  
      return prevMessages;
    });
  });

  // Clean up the socket event listener when the component unmounts
  return () => {
    clearInterval(interval);
    // Leave the room when the component unmounts
    // socket.emit('leaveRoom', roomId);
  };
},[currentUser.id, user.id, setUsers, users,roomId]);

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data.secure_url;
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async ({file,setFile}) => {
    let imgUrl = "";
    if (file) imgUrl = await upload(file);
    const message = {
      id: uuidv4(),
      userId: currentUser.id,
      sender: currentUser.id,
      receiver: user.id,
      content: newMessage,
      profilePic: currentUser.profilePic,
      timestamp: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      image: imgUrl
    };

    // Emit the message to the server
    socket.emit('chat message', {message,roomId});

    const userIndex = users.findIndex((u) => u.id === user.id);

    // If the user is found, update their latestMessage
    if (userIndex !== -1) {
      const updatedUsers = [...users]; // Create a copy of the users array
      updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
        timestamp: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        latestMessage: message.content, // Replace with the updated message
      };
      
      // Set the updated users array in your state or pass it as a prop to the ChatList component
      setUsers(updatedUsers); // Replace with your state update method or prop assignment
    }

    setNewMessage('');
    setFile(null);
  };

  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{user.username}</span>
      </div>
      {messages && <Messages messages={messages} timeUpdated={timeUpdated} />}
      <Input sendMessage={sendMessage} newMessage={newMessage} setNewMessage={setNewMessage}/>
    </div>
  )
}

export default Chat