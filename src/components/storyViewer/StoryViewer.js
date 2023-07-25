import React,{useState, useEffect} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import moment from "moment";
import Slider from 'react-touch-drag-slider';
import styled from 'styled-components';

const StoryViewerContainer = styled.div`
  position: fixed;
  z-index: 1000;
  border-radius: 10px;
  width: 35%;
  top:20px;
  left:370px;
  height: 90vh;
  overflow: hidden;
  background: linear-gradient(to bottom right, #ff5f6d, #ffc371);
`;

const TopContainer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 8px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const SliderContainer = styled.div`
  height: 80vh; 
  width: 100%;
  overflow: hidden;
  padding: 5% 0%; 
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }
`;  

function StoryViewer({stories,activeIndex, onClose}) {
  const [currentIndex, setCurrentIndex] = useState(activeIndex);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex(prevIndex => prevIndex < stories.length - 1 ? prevIndex + 1 : 0);
    }, 5000);
    return () => clearTimeout(timer); // This will clear the timer when the component unmounts
  }, [currentIndex, stories.length]);

  return (
    <StoryViewerContainer>
      <TopContainer>
        <UserInfo>
          <img src={stories[currentIndex].profilePic} alt=""></img>
          <span>{stories[currentIndex].username}</span>
          <span>{moment(stories[currentIndex].createdAt).fromNow()}</span>
        </UserInfo>
        <CloseIcon onClick={onClose} style={{cursor:"pointer", marginRight:"10px"}}/>
      </TopContainer>
      
      <SliderContainer>
        <Slider
          onSlideComplete={(i) => {
            console.log('finished dragging, current slide is', i)
            setCurrentIndex(i);
          }}
          onSlideStart={(i) => {
            console.log('started dragging on slide', i)
          }}
          activeIndex={currentIndex}
          threshHold={100}
          transition={0.5}
          scaleOnDrag={true}
        >
          {stories.map((story,index)=>(
            <ImageContainer key={index}>
              <img src={story.img} alt="Story" />
            </ImageContainer>
          ))}
        </Slider>
      </SliderContainer>
    </StoryViewerContainer>
  )
}

export default StoryViewer
