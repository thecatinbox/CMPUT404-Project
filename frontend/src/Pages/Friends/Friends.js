import User from '../../Components/User/User'; 
import TopBar from "../../Components/TopBar/TopBar";
import './Friends.css';
import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';

function Friends() {

  const uuid = localStorage.getItem('uuid'); 
  const app_url = localStorage.getItem('url'); 

  const FOLLOWER_ENDPOINT = app_url + "/service/authors/" + uuid + "/followers/"; 
  const FOLLOWING_ENDPOINT = app_url + "/service/authors/" + uuid + "/following/"; 

  const [followerData, setFollowerData] = useState([]);
  const [followingData, setFollowingData] = useState([]);

  const theme = createTheme({
    palette: {
      text: {
        primary: '#007DAA',
        secondary: "#79B3C1",
      },
      primary: {
        main: '#FF694B', 
      },
      secondary: {
        main: '#007DAA',
      }
    },
  });

  function fetchData() {
    try {
      fetch(FOLLOWER_ENDPOINT, {
        headers: { "Accept": "application/json", "Authorization": 'Basic ' + btoa('username1:123') },
        method: "GET"
      }).then(response => response.json()).then(data => {
        setFollowerData(data.items);
      });
    } catch (error) {
      console.error('Error:', error);
    }

    try {
      fetch(FOLLOWING_ENDPOINT, {
        headers: { "Accept": "application/json", "Authorization": 'Basic ' + btoa('username1:123') },
        method: "GET"
      }).then(response => response.json()).then(data => {
        setFollowingData(data.items);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }); 

  return (
    <>
      <TopBar id="friends"/>
      <ThemeProvider theme={ theme }>
      {/* <Box sx={{  bgcolor: "#E6EAF3", height: '100%', minHeight: '100vw' }}> */}
      <div className="friends">

        <div className="following">
          <h2>My Followings</h2>
          {followingData.map(function(user){
              return <User user={user} followed={true} key={user.id}/>;
          })}
        </div>

        <div className="follower">
          <h2>My Followers</h2>
          {followerData.map(function(user){
              return <User user={user} followed={false} key={user.id}/>;
          })}
        </div>

      </div>
      {/* </Box> */}
      </ThemeProvider>
    </>
  );
}

export default Friends;