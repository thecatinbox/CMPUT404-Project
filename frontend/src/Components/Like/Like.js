import React, { useState, useEffect } from "react";
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function Like({post}) { 

  const uuid = localStorage.getItem('uuid'); 
  const user = localStorage.getItem('user'); 
  const puid = post.uuid; 
  const user_url = post.author.url; 

  var LIKE_ENDPOINT = user_url + "/posts/" + puid + "/likes/"; 
  var MESSAGE_ENDPOINT = user_url + '/inbox/'; 
  // console.log(MESSAGE_ENDPOINT); 
  
  const [likeNum, setLikeNum] = useState();
  const [liked, setLiked] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);

  async function fetchLikes() {
    try {
      if (LIKE_ENDPOINT.includes("cmput404-project-data.herokuapp.com")) {
        const response = await fetch(LIKE_ENDPOINT, {
          headers: { "Accept": "application/json", "Authorization": 'Basic ' + btoa('username1:123') },
          method: "GET"
        });
    
        const data = await response.json();
        setLikeNum(data.total_likes); 
  
        const isLikedByCurrentUser = data.items.some(item => item.author && item.author.uuid === uuid);
        if (isLikedByCurrentUser) {
          setLiked(true); 
        }
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    if (!isDataFetched) {
      fetchLikes(); 
      setIsDataFetched(true); 
    } 
  }); 

  // Handle add new like
  async function handleNewLike() {
    if (liked == false) {
      try {
        const header = {
          "Content-Type": 'application/json',
          "Accept": 'application/json', 
          "Authorization": 'Basic ' + btoa('username1:123')
        }

        // Send like message to inbox 
        const body = JSON.stringify(
          { 
            "type": "like", 
            "p_or_c": "post", 
            "author": JSON.parse(user), 
            "postId": puid
         }
        ); 

        console.log(body); 

        await fetch(MESSAGE_ENDPOINT, {
          headers: header,
          body: body, 
          method: "POST"
        }); 

        setIsDataFetched(false); 

        } catch (error) {
          console.error('Error:', error);
        }
      
    }
  }

  return (
    <IconButton onClick={handleNewLike}>
        <FontAwesomeIcon id="like_button" icon={faHeart} color={liked ? 'red' : ''}/>
        <Typography variant="body2" marginLeft={"8px"}>{likeNum}</Typography>
    </IconButton>
  );
}

export default Like;
