import User from '../../Components/User/User'; 
import TopBar from "../../Components/TopBar/TopBar";
import './Friends.css';
import React, { useState, useEffect } from "react";

/* 
const followingData = [
  {
    id: 1, 
    displayName: "Username1"
  },
  {
    id: 2, 
    displayName: "Username2"
  },
  {
    id: 3, 
    displayName: "Username3"
  },
];

const followerData = [
  {
    id: 1, 
    displayName: "Username1"
  },
  {
    id: 4, 
    displayName: "Username4"
  },
  {
    id: 5, 
    displayName: "Username5"
  },
  {
    id: 6, 
    displayName: "Username6"
  },
];
*/ 

function Friends() {

  const uuid = localStorage.getItem('uuid'); 
  const app_url = localStorage.getItem('url'); 

  var FOLLOWER_ENDPOINT = "http://" + app_url + "/server/authors/" + uuid + "/followers/"; 
  var FOLLOWING_ENDPOINT = "http://" + app_url + "/server/authors/" + uuid + "/followers/"; 

  const [followerData, setFollowerData] = useState([]);
  const [followingData, setFollowingData] = useState([]);

  function fetchData() {
    try {
      fetch(FOLLOWER_ENDPOINT, {
        headers: { "Accept": "application/json" },
        method: "GET"
      }).then(response => response.json()).then(data => {
        setFollowerData(data.items);
      });
    } catch (error) {
      console.error('Error:', error);
    }

    try {
      fetch(FOLLOWING_ENDPOINT, {
        headers: { "Accept": "application/json" },
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
      <div className="friends">

        <div className="following">
          <h2>My Followings</h2>
          {followingData.map(function(user){
              return <User user={user} key={user.id}/>;
          })}
        </div>

        <div className="follower">
          <h2>My Followers</h2>
          {followerData.map(function(user){
              return <User user={user} key={user.id}/>;
          })}
        </div>

      </div>
    </>
  );
}

export default Friends;