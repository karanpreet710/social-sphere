import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import {makeRequest} from "../../axios";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import styled from 'styled-components';

const SearchResults = styled.ul`
    list-style-type: none;
    position: absolute;
    top:50px;
    left:230px;
    margin: 0;
    padding: 0px;
    border: 1px solid #ccc;
    border-radius: 0px 0px 4px 4px;
    ${'' /* background-color: #f8f8f8; */}
    overflow: auto;
    width: 548px;  /* Adjust this to match the width of your search input */
    z-index: 999;  /* Make sure the dropdown appears above the rest of your content */
    li{
      display:flex;
      gap:10px;
      margin: 10px 5px;
      padding: 5px 5px;
      border-radius: 5px;
      img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .userItem:hover {
        background-color: #e8e8e8;  /* Replace with the color you want */
    }
  `;

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]); 
  const [users,setUsers] = useState([]);

  const handleClick = () =>{
    makeRequest.post("/auth/logout")
    setCurrentUser(null);
  }

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(()=>{
    const fetchUser = async () => {
      const usersData=await makeRequest.get('/users/find');
      setUsers(usersData.data);
    }
    fetchUser();
  },[])

  useEffect(() => {
    let results = [];
    if(searchTerm) {
      results = users.filter(user =>
        user.username.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    }
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Social Sphere</span>
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search for a username..." value={searchTerm} onChange={handleChange}/>
          { searchTerm !== '' && (
            <SearchResults>
              {searchResults.length > 0 ? (
              searchResults.map((item, index) => (
                <Link key={index}
                  to={`/profile/${item.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <li className="userItem">
                    <img src={item.profilePic} alt="Profile Pic" width="30" height="30" />
                    <span>{item.username}</span>
                  </li>
                </Link>
              ))): <li>No such username found...</li>}
            </SearchResults>
          )}
        </div>
      </div>
      <div className="right">
        <Link to="/chat" style={{ textDecoration: "none", color:"black",height:"24px" }}>
          <ChatIcon />
        </Link>
        <NotificationsIcon />
        <Link to="/login" style={{ textDecoration: "none", color:"black",height:"24px"  }}>
          <LogoutIcon onClick={handleClick}/>
        </Link>
        <div className="user">
          <img
            src={currentUser.profilePic}
            alt=""
          />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;