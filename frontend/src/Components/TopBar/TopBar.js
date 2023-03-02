import React from "react";
import "./TopBar.css"; 

const TopBar = () => {
  return (
    <div class="topnav">
      <script src="https://kit.fontawesome.com/68d79784aa.js" crossorigin="anonymous"></script>
      <a class="active" href="#main">Main</a>
      <a href="#inbox">Inbox</a>
      <a href="#friends">Friends</a>
      <a href="#profile">Profile</a>
      <div class="search-container">
        <form action="/action_page.php">
          <input type="text" placeholder="Search.." name="search"></input>
          <button type="submit"><i class="fa fa-search"></i></button>
        </form>
      </div>
    </div>
  ); 
}; 

export default TopBar;