import { useContext, useState } from "react";
import "./stories.scss"
import { AuthContext } from "../../context/authContext"
import { makeRequest } from "../../axios";
import StoryViewer from "../storyViewer/StoryViewer"
import StoryShare from "../storyShare/StoryShare";
import {useQuery} from "react-query";
 
const Stories = () => {

  const {currentUser} = useContext(AuthContext)
  // const [stories, setStories] = useState([]);
  const [storyViewerOpen, setStoryViewerOpen] = useState(false);
  // const [selectedStory, setSelectedStory] = useState(null);
  const [storyIndex, setStoryIndex] = useState(0);
  const [shareStory, setShareStory] = useState(false); 

  const {isLoading, error, data:stories} = useQuery('stories',()=>
    makeRequest.get(`/stories?userId=${currentUser.id}`).then((res)=>{
      return res.data; 
    })
  )
  // useEffect(() => {
  //   // Fetch user's stories and stories of users they follow
  //   const fetchStories = async () => {
  //     const storiesData = await makeRequest.get(`/stories?userId=${currentUser.id}`);
  //     setStories(storiesData.data);
  //   };
    
  //   fetchStories();
  // }, [currentUser.id]);

  // useEffect(() => {
  //   if(storyViewerOpen) {
  //     const timer = setTimeout(() => {
  //       nextStory();
  //     }, 5000); // 5 seconds

  //     // Clean up the timer if the component is unmounted or if storyViewerOpen changes
  //     return () => clearTimeout(timer);
  //   }
  // }, [storyViewerOpen, storyIndex]);

  const handleUserClick = (story,index) => {
    setStoryIndex(index);
    // setSelectedStory(story)
    setStoryViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setStoryViewerOpen(false);
  };

  // const nextStory = () => {
  //   if(storyIndex < stories.length - 1) {
  //     const newStoryIndex = storyIndex + 1;
  //     setStoryIndex(newStoryIndex);
  //     setSelectedStory(stories[newStoryIndex])
  //   } else {
  //     handleCloseViewer();
  //   }
  // }

  // const prevStory = () => {
  //   if(storyIndex > 0) {
  //     const newStoryIndex = storyIndex - 1;
  //     setStoryIndex(newStoryIndex);
  //     setSelectedStory(stories[newStoryIndex])
  //   }
  // }

  return (
    <div className="stories-container">
      <div className="stories">
      {!isLoading && stories && !stories.some((story)=>story.userId===currentUser.id) && <div className="story">
          <img src={currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
          <button onClick={()=>setShareStory(true)}>+</button>
        </div>}
        {error ? "Something went wrong!"
        :isLoading ? "Loading" : 
        stories.map((story,index)=>(
          <div className="story" key={story.storyId} style={{cursor:"pointer"}} onClick={() => handleUserClick(story,index)}>
            <img src={story.profilePic} alt="" />
            <span>{story.username}</span>
          </div>
        ))}
      </div>
      {storyViewerOpen && <StoryViewer stories={stories} activeIndex={storyIndex} onClose={handleCloseViewer}/>}
      {shareStory && <StoryShare setShareStory={setShareStory}/>}
    </div>
  )
}

export default Stories