import React, {useState, useEffect} from 'react';
import Post from '../../Components/Post/Post'; 
import AddPost from '../../Components/AddPost/AddPost'; 
import TopBar from "../../Components/TopBar/TopBar";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import './Network.css';

function Network() {

  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);

  // If not signed in, go to network page 
  if (!localStorage.getItem('uuid')) {
    navigate("/signin");
  }

  const app_url = localStorage.getItem('url'); 
  const uuid = localStorage.getItem('uuid'); 
  const ENDPOINT = app_url + '/service/authors/' + uuid + '/inbox/'; 
  const MYPOST_ENDPOINT = app_url + '/service/authors/' + uuid + '/posts/'; 
  
  async function fetchPostData() {
    try {
      const response = await fetch(ENDPOINT, {
        headers: { "Accept": "application/json", "Authorization": 'Basic ' + btoa('username1:123') },
        method: "GET"
      });
  
      const data = await response.json();
      // console.log(data.items)
      // console.log(data.items[0])
      const originalArray = data.items[0]; 
      const newArray = originalArray.map(item => item.post);

      // console.log(newArray);
      return newArray;
    } catch (error) {
      console.error('Error:', error);
      return []; 
      // Handle the error here
    }
  }

  async function fetchMyPostData() {
    try {
      const response = await fetch(MYPOST_ENDPOINT, {
        headers: { "Accept": "application/json", "Authorization": 'Basic ' + btoa('username1:123') },
        method: "GET"
      });
  
      const data = await response.json();
      // console.log(data.items);
      return data.items;
      
    } catch (error) {
      console.error('Error:', error);
      return []; 
      // Handle the error here
    }
  }
  
  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      Promise.all([fetchPostData(), fetchMyPostData()]).then(results => {
        const posts = results[0];
        const myposts = results[1];
        // console.log(posts); 
        const mergedPosts = [...posts, ...myposts];
        setPostList(mergedPosts.sort((a, b) => new Date(a.published) - new Date(b.published)));
      });
    }, 1000);
  
    return () => clearInterval(fetchDataInterval); // Clear the interval on unmount
  });  

  return (
    <>
      <TopBar id="network"/>
      {/* <Box sx={{  bgcolor: "#E6EAF3", height: '100%', minHeight: '100vw'}}> */}
      <div className="network">
        <div className="posts">
        
        <AddPost/>
        {postList.reverse().map(function(post){
            return <Post post={post} key={post.id}/>;
        })}
        
        </div>
      </div>
      {/* </Box> */}
    </>

  );
}

export default Network;
