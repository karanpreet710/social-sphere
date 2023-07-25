import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";

const Profile = () => {

  const [openUpdate,setOpenUpdate] = useState(false);
  
  const {currentUser} = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split('/')[2]);

  const {isLoading, data, refetch} = useQuery(["user"],()=>
    makeRequest.get("/users/find/" + userId).then((res)=>{
      return res.data; 
    }),
    {
      enabled: false  // This disables the initial fetch
    }
  )

  useEffect(() => {
    refetch(); // Refetch data when userId changes
  }, [userId, refetch]);

  const {isLoading: relationshipIsLoading, data:relationshipData} = useQuery(["relationship"],()=>
    makeRequest.get("/relationships?followedUserId=" + userId).then((res)=>{
      return res.data; 
    })
  )

  const {
    isLoading: requestIsLoading,
    data: requestData,
  } = useQuery(['requests'], () =>
    makeRequest.get('/requests?receiverId=' + userId).then((res) => res.data)
  );

  const queryClient = useQueryClient();

  const followMutation = useMutation(
    (following) => {
      if(following) return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post('/relationships',{userId});
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const requestMutation = useMutation(
    () => makeRequest.post('/requests', { requesterId: currentUser.id, receiverId: userId }),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['requests']);
      },
    }
  );

  const handleFollow = () => {
    if (relationshipData.includes(currentUser.id)) {
      followMutation.mutate(true);
    } else if (requestData.some((req) => req.requesterId === currentUser.id)) {
      // Pending request, do nothing
    } else {
      // Send follow request
      requestMutation.mutate();
    }
  }

  const followButton = () => {
    if (userId === currentUser.id) {
      return <button onClick={() => setOpenUpdate(true)}>Update</button>;
    } else if (relationshipData.includes(currentUser.id)) {
      return <button onClick={handleFollow}>Following</button>;
    } else if (requestData.some((req) => req.requesterId === currentUser.id)) {
      return <button disabled>Pending</button>;
    } else {
      return <button onClick={handleFollow}>Follow</button>;
    }
  };


  return (
    <div className="profile">
      {isLoading || !data ? "Loading":
      <>
      <div className="images">
        <img
          src={data.coverPic}
          alt=""
          className="cover"
        />
        <img
          src={data.profilePic}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="medium" />
            </a>
          </div>
          <div className="center">
            <span>{data.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{data.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{data.website}</span>
              </div>
            </div>
            {relationshipIsLoading || requestIsLoading ? 'Loading' : followButton()}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      <Posts userId = {userId}/>
      </div>
      </>}
    {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
    </div>
  );
};

export default Profile;