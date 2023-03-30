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
  const ENDPOINT = app_url + '/service/authors/' + uuid + '/inbox'; 
  
  async function fetchPostData() {
    try {
      const response = await fetch(ENDPOINT, {
        headers: { "Accept": "application/json", "Authorization": 'Basic ' + btoa('username1:123') },
        method: "GET"
      });
  
      const data = await response.json();
      console.log(data.items)
      console.log(data.items[0])
      const originalArray = data.items[0]; 
      const newArray = originalArray.map(item => item.post);

      console.log(newArray);
      return newArray;
    } catch (error) {
      console.error('Error:', error);
      return []; 
      // Handle the error here
    }
  }
  
  useEffect(() => {
    Promise.all([fetchPostData()]).then(results => {
      const posts = results[0];
      console.log(posts); 
      setPostList(posts.sort((a, b) => new Date(a.published) - new Date(b.published)));
    });
  }, []);

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
