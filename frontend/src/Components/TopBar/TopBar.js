import React from "react";
import "./TopBar.css"; 

const TopBar = () => {
  return (
    <div className="topnav">
      <script src="https://kit.fontawesome.com/68d79784aa.js" crossOrigin="anonymous"></script>
      <a className="active" href="#main">Main</a>
      <a href="#inbox">Inbox</a>
      <a href="#friends">Friends</a>
      <a href="#profile">Profile</a>
      <div className="search-container">
        <form action="/action_page.php">
          <input type="text" placeholder="Search.." name="search"></input>
          <button type="submit"><i className="fa fa-search"></i></button>
        </form>
      </div>
    </div>
  ); 
}; 

export default TopBar;