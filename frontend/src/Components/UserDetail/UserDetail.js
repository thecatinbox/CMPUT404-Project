import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import "./UserDetail.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';

function UserDetail({user, followed}) { 

  const current_user = JSON.parse(localStorage.getItem('user')); 
  const app_url = localStorage.getItem('url'); 

  // var FOLLOW_REQUEST_ENDPOINT = app_url + "/service/authors/" + uuid + "/followRequests/" + follow_uuid; 
  var FOLLOWER_ENDPOINT = app_url + "/service/authors/" + current_user.uuid + "/followers/" + user.uuid + "/"; 
  // console.log(FOLLOWER_ENDPOINT); 

  // Send to local/foreign user's inbox 
  var MESSAGE_ENDPOINT = user.url + '/inbox/'; // app_url + '/service/authors/' + follow_uuid + '/inbox'; 
  // console.log(MESSAGE_ENDPOINT); 

  const sendTeam1FollowRequest = () => {

    const headers = {
      "Content-Type": 'application/json',
      "Accept": 'application/json', 
      "Authorization": 'Basic cDJwYWRtaW46cDJwYWRtaW4=' 
    };
  
    const data = {
      "type": "follow",
      "summary": current_user.displayName + " wants to follow" + user.displayName,  
      "actor": current_user, 
      "object": user
    }; 
  
    console.log(data); 
  
    axios.post(MESSAGE_ENDPOINT, data, {
      headers: headers
    }).catch((error) => {
      console.log('error: ' + error);
    }); 

  }

  // Send follow request to user's inbox 
  const sendTeam12FollowRequest = () => {
    const headers = {
      "Content-Type": 'application/json',
      "Accept": 'application/json', 
      "Authorization": 'Basic ' + btoa('username1:123')
    };
  
    const data = {
      "type": "follow",
      "summary": current_user.displayName + " wants to follow you",  
      "actor": current_user
    }; 
  
    console.log(data); 
  
    axios.post(MESSAGE_ENDPOINT, data, {
      headers: headers
    }).catch((error) => {
      console.log('error: ' + error);
    }); 
  };

  const sendTeam16FollowRequest = () => {

    const headers = {
      "Content-Type": 'application/json',
      "Accept": 'application/json', 
      "Authorization": 'Basic ' + btoa('Team12:P*ssw0rd!') 
    };
  
    const data = {
      "type": "follow",
      "summary": current_user.displayName + " wants to follow" + user.displayName,  
      "actor": current_user, 
      "object": user
    }; 
  
    console.log(data); 
  
    axios.post(MESSAGE_ENDPOINT, data, {
      headers: headers
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
    }

    fetch(FOLLOWER_ENDPOINT, {
      headers: header,
      method: "DELETE"
    }).catch((error) => {
      console.log('error: ' + error);
    }); 
  }

  const sendFollowRequest = () => {
    if (MESSAGE_ENDPOINT.includes("sd16-api")) {
      sendTeam16FollowRequest(); 
    } else if (MESSAGE_ENDPOINT.includes("p2psd")) {
      sendTeam1FollowRequest(); 
    } else {
      sendTeam12FollowRequest(); 
    }
  }

  const handleFollow = () => {
    if (!followed) {
      sendFollowRequest(); 
      // acceptFollowRequest(); 
    } else {
      removeFollower(); 
    }
  }

  console.log(user); 

  return (
    <div className='user'>
      <Grid sx={{ minWidth: "400px", display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ alignSelf: 'flex-start' }}>
          {user.displayName}
        </Typography>
        <Typography sx={{ alignSelf: 'flex-end' }}>
          {user.uuid != current_user.uuid && 
            <>
              <Button onClick={handleFollow}>
                <FontAwesomeIcon icon={followed ? faUserMinus : faUserPlus} />
              </Button>
            </>
          }
        </Typography>
      </Grid>
      <Typography sx={{ alignSelf: 'flex-start' }}>
          Host {user.host}
      </Typography>
    </div>
  );
}

export default UserDetail;