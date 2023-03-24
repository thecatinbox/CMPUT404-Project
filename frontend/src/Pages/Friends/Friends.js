import User from '../../Components/User/User'; 
import TopBar from "../../Components/TopBar/TopBar";
import './Friends.css';
import React, { useState, useEffect } from "react";

function Friends() {

  const uuid = localStorage.getItem('uuid'); 
  const app_url = localStorage.getItem('url'); 

  const FOLLOWER_ENDPOINT = app_url + "/server/authors/" + uuid + "/followers/"; 
  const FOLLOWING_ENDPOINT = app_url + "/server/authors/" + uuid + "/following/"; 

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
    </>
  );
}

export default Friends;