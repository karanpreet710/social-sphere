import "./rightBar.scss";
import io from 'socket.io-client';
import { AuthContext } from "../../context/authContext";
import { useState,useEffect, useContext } from "react";
import { makeRequest } from "../../axios";
import { useQuery, useMutation, useQueryClient } from 'react-query';

const RightBar = () => {
  const {currentUser} = useContext(AuthContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState(null);
  let socket;

  useEffect(() => {
    const fetchData = async () => {
      const data = await makeRequest('/relationships?followerUserId='+ currentUser.id);
      setOnlineFriends(data.data.users);
    }
    fetchData();
    socket = io('https://api-socialsphere.onrender.com');

    socket.on('connect', () => {
      socket.emit('online', currentUser);
    });

    socket.on('onlineUsers', users => {
      setOnlineUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser]);

  const queryClient = useQueryClient();

  const {isLoading, error, data: requests} = useQuery(['requests',currentUser.id],()=>
    makeRequest.get("/requests?receiverId=" + currentUser.id).then((res)=>{
      return res.data; 
    })
  )

  const acceptRequestMutation = useMutation(
    async ({requestId,requesterId}) => {
      await makeRequest.post('/requests/accept', { requestId, requesterId, receiverId:currentUser.id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['requests', currentUser.id]);
      },
    },
  );

  const declineRequestMutation = useMutation(
    async (requestId) => {
      await makeRequest.post('/requests/decline', { requestId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['requests', currentUser.id]);
      },
    },
  );

  const handleAccept = (requestId,requesterId) => {
    acceptRequestMutation.mutate({requestId,requesterId});
  };

  const handleDecline = (requestId) => {
    declineRequestMutation.mutate(requestId);
  };

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Pending follow requests</span>
          {error ? "Something went wrong!"
          :isLoading ? "Loading" :
          requests.map(request=>(
            <div key={request.requestId} className="user">
              <div className="userInfo">
                <img
                  src={request.profilePic}
                  alt=""
                />
                <span>{request.username}</span>
              </div>
              <div className="buttons">
                <button onClick={() => handleAccept(request.requestId, request.requesterId)}>accept</button>
                <button onClick={() => handleDecline(request.requestId)}>decline</button>
              </div>
            </div>
          ))}
        </div>
        <div className="item">
          <span>Online Friends</span>
          {onlineUsers && onlineFriends && onlineUsers.map(user => (
            onlineFriends.some(r => r.id === user.id) && (<div key={user.id} className="user">
              <div className="userInfo">
                <img
                  src={user.profilePic}
                  alt=""
                />
                <div className="online" />
                <span>{user.name}</span>
              </div>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
};

export default RightBar;