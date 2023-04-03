import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import "./User.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons'

function User({user, followed}) { 

  const current_user = JSON.parse(localStorage.getItem('user')); 
  const uuid = localStorage.getItem('uuid'); 
  const follow_uuid = user.uuid; 
  const follow_url = user.url; 
  const app_url = localStorage.getItem('url'); 

  // var FOLLOW_REQUEST_ENDPOINT = app_url + "/service/authors/" + uuid + "/followRequests/" + follow_uuid; 
  var FOLLOWER_ENDPOINT = app_url + "/service/authors/" + uuid + "/followers/" + follow_uuid + "/"; 
  // console.log(FOLLOWER_ENDPOINT); 

  // Send to local/foreign user's inbox 
  var MESSAGE_ENDPOINT = follow_url + '/inbox/'; // app_url + '/service/authors/' + follow_uuid + '/inbox'; 
  // console.log(MESSAGE_ENDPOINT); 

  // Send follow request to user's inbox 
  const sendFollowRequest = () => {
    const header = {
      "Content-Type": 'application/json',
      "Accept": 'application/json', 
      "Origin": 'http://localhost:3000', 
      "Authorization": 'Basic ' + btoa('username1:123'),
    }

    const body = JSON.stringify({
      "type": "follow",
      "summary": current_user.displayName + " wants to follow you",  
      "actor": current_user
    }); 

    // console.log(header); 
    console.log(body); 

    fetch(MESSAGE_ENDPOINT, {
      headers: header,
      body: body, 
      method: "POST"
    }).catch((error) => {
      console.log('error: ' + error);
    }); 
  }

  // Handle remove follower 
  const removeFollower = () => {
    // console.log('try remove user');
    const header = {
      "Content-Type": 'application/json',
      "Accept": 'application/json', 
      "Origin": 'http://localhost:3000'
    }

    fetch(FOLLOWER_ENDPOINT, {
      headers: header,
      method: "DELETE"
    }).catch((error) => {
      console.log('error: ' + error);
    }); 
  }

  const handleFollow = () => {
    if (!followed) {
      sendFollowRequest(); 
      // acceptFollowRequest(); 
    } else {
      removeFollower(); 
    }
  }

  return (
    <div className='user'>
      <Card sx={{ minWidth: 275 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ alignSelf: 'flex-start' }}>
          {user.displayName}
        </Typography>
        <Typography sx={{ alignSelf: 'flex-end' }}>
          {uuid != follow_uuid && 
            <>
              <Button onClick={handleFollow}>
                <FontAwesomeIcon icon={followed ? faUserMinus : faUserPlus} />
              </Button>
            </>
          }

        </Typography>
      </CardContent>
      </Card>
    </div>
  );
}

export default User;