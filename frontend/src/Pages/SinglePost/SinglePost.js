import './SinglePost.css';
import TopBar from "../../Components/TopBar/TopBar";
import React, {useState, useEffect} from 'react';
import Post from '../../Components/Post/Post';
import { useNavigate } from "react-router-dom";

function SinglePost() {
  const navigate = useNavigate();

  // const post_uuid = localStorage.getItem('post_uuid'); 
  // const post_puid = localStorage.getItem('post_puid'); 
  // const app_url = localStorage.getItem('url'); 
  const ENDPOINT = localStorage.getItem('post_url'); // 'http://' + app_url + '/service/authors/' + post_uuid + '/posts/' + post_puid; 

  const [post, setPost] = useState();

  async function fetchData() {
    try {
      const response = await fetch(ENDPOINT, {
        headers: { "Accept": "application/json", "Authorization": 'Basic ' + btoa('username1:123') },
        method: "GET"
      });
  
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error('Error:', error);
      // Handle the error here
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []); // Only run this effect once on mount
  
  return (
    <>
      <TopBar id="single-post"/>
      <div className="single-post">
      {post ? ( 
        <>
            <Post post={post}/>
        </>
      ) : (
        <h2>No post found</h2>
      )
        }
      </div>
    </>
  );
}

export default SinglePost;