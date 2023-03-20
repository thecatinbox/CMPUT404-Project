import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import "./User.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons'

function User({user}) { 

  const uid = localStorage.getItem('uuid'); 
  const uuid = user.uuid; 
  const app_url = localStorage.getItem('url'); 

  var FOLLOW_REQUEST_ENDPOINT = "http://" + app_url + "/server/authors/" + uid + "/followRequests/" + uuid; 
  var FOLLOW_ENDPOINT = "http://" + app_url + "/server/authors/" + uid + "/followers/" + uuid; 
  console.log(FOLLOW_REQUEST_ENDPOINT); 
  console.log(FOLLOW_ENDPOINT); 

  // Handle add new comment 
  const sendFollowRequest = () => {

    const header = {
      "Content-Type": 'application/json',
      "Accept": 'application/json', 
      "Origin": 'http://localhost:3000'
    }

    const body = JSON.stringify({}); 

    // console.log(header); 
    console.log(body); 

    fetch(FOLLOW_REQUEST_ENDPOINT, {
      headers: header,
      body: body, 
      method: "POST"
    }).catch((error) => {
      console.log('error: ' + error);
    }); 
  }

  // Handle add new comment 
  const acceptFollowRequest = () => {
    const header = {
      "Content-Type": 'application/json',
      "Accept": 'application/json', 
      "Origin": 'http://localhost:3000'
    }

    const body = JSON.stringify({
      "isFollowed": true
    }); 

    // console.log(header); 
    console.log(body); 

    fetch(FOLLOW_ENDPOINT, {
      headers: header,
      body: body, 
      method: "PUT"
    }).catch((error) => {
      console.log('error: ' + error);
    }); 
  }

  const handleFollow = () => {
    sendFollowRequest(); 
    acceptFollowRequest(); 
  }

  return (
    <div className='user'>
      <Card sx={{ minWidth: 275 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ alignSelf: 'flex-start' }}>
          {user.displayName}
        </Typography>
        <Typography sx={{ alignSelf: 'flex-end' }}>
          <Button onClick={handleFollow}>
            <FontAwesomeIcon icon={faUserPlus} />
          </Button>
        </Typography>
      </CardContent>
      </Card>
    </div>
  );
}

export default User;