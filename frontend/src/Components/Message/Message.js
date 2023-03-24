import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from "react-router-dom";

import Grid from '@mui/material/Grid';
import "./Message.css"; 

function Message({message}) { 

  // console.log(message); 

  const navigate = useNavigate();

  const toSinglePost = (post_url) => {
    localStorage.setItem('post_url', post_url); 
    navigate("/singlepost"); 
  }

  const acceptFollowRequest = (follow_uuid) => {
    const uuid = localStorage.getItem('uuid'); 
    // const follow_uuid = user.uuid; 
    const app_url = localStorage.getItem('url'); 
  
    const FOLLOW_ENDPOINT = "http://" + app_url + "/server/authors/" + uuid + "/followers/" + follow_uuid; 

    const header = {
      "Content-Type": 'application/json',
      "Accept": 'application/json', 
      "Origin": 'http://localhost:3000'
    }

    const body = JSON.stringify({
      "isFollowed": true
    }); 

    // console.log(header); 
    // console.log(body); 

    fetch(FOLLOW_ENDPOINT, {
      headers: header,
      body: body, 
      method: "PUT"
    }).catch((error) => {
      console.log('error: ' + error);
    }); 
  }

  if (message) {
    const type = message.type; 

    switch (type) {
      case "share":
        return (
          <div className='message'>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ alignSelf: 'flex-start' }}>
                {message.author.displayName} shared a post with you 
              </Typography>
              <Typography sx={{ alignSelf: 'flex-end' }}>
                <Button onClick={() => toSinglePost(message.post.id)}> <FontAwesomeIcon icon={faArrowRight} /></Button>
              </Typography>
            </Grid>
          </div>
        );
      
      case "comment":
        return (
          <div className='message'>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ alignSelf: 'flex-start' }}>
                {message.author.displayName} commented: "{message.comment}"
              </Typography>
              <Typography sx={{ alignSelf: 'flex-end' }}>
                <Button onClick={() => toSinglePost(message.post)}> <FontAwesomeIcon icon={faArrowRight} /></Button>
              </Typography>
            </Grid>
          </div>
        );

      case "Follow":
        return (
          <div className='message'>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ alignSelf: 'flex-start' }}>
                {message.summary}
              </Typography>
              <Typography sx={{ alignSelf: 'flex-end' }}>
                <Button onClick={() => acceptFollowRequest(message.actor.uuid)}> <FontAwesomeIcon icon={faCheck} /></Button>
                <Button> <FontAwesomeIcon icon={faXmark} /></Button>
              </Typography>
            </Grid>
          </div>
        );
      
      case "like":
        return (
          <div className='message'>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ alignSelf: 'flex-start' }}>
                {message.summary}
              </Typography>
              <Typography sx={{ alignSelf: 'flex-end' }}>
                <Button onClick={() => toSinglePost(message.object)}> <FontAwesomeIcon icon={faArrowRight} /></Button>
              </Typography>
            </Grid>
          </div>
        );

      default:
        return (
          <div className='message'>
            <Typography>
              {message.type}
            </Typography>
          </div>
        );
    }
  }

}

export default Message;