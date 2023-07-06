import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "react-query";
import {makeRequest} from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Posts = () => {

  const {currentUser} = useContext(AuthContext);

  const {isLoading, error, data} = useQuery('posts',()=>
    makeRequest.get("/posts?userId=" + currentUser.id).then((res)=>{
      return res.data; 
    })
  )

  return <div className="posts">
    {error ? "Something went wrong!"
      :isLoading ? "Loading" : data.map(post=>(
      <Post post={post} key={post.id}/>
    ))}
  </div>;
};

export default Posts;