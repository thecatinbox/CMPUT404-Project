import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import Grid from '@mui/material/Grid';
import "./Message.css"; 

function Message({message}) { 

  // console.log(message); 

  const acceptFollowRequest = () => {
    const uuid = localStorage.getItem('uuid'); 
    // const follow_uuid = user.uuid; 
    const app_url = localStorage.getItem('url'); 
  
    const FOLLOW_ENDPOINT = "http://" + app_url + "/server/authors/" + uuid + "/followers/" // + follow_uuid; 

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
      case "post":
        return (
          <div className='message'>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ alignSelf: 'flex-start' }}>
                Your friend shared a post with you. 
              </Typography>
              <Typography sx={{ alignSelf: 'flex-end' }}>
                <Button> <FontAwesomeIcon icon={faArrowRight} /></Button>
              </Typography>
            </Grid>
          </div>
        );
      
      case "comment":
        return (
          <div className='message'>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ alignSelf: 'flex-start' }}>
                {message.author} commented: "{message.comment}"
              </Typography>
              <Typography sx={{ alignSelf: 'flex-end' }}>
                <Button> <FontAwesomeIcon icon={faArrowRight} /></Button>
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
                <Button> <FontAwesomeIcon icon={faCheck} /></Button>
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
                <Button> <FontAwesomeIcon icon={faArrowRight} /></Button>
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