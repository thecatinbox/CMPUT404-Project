import React from "react";
import { Outlet } from "react-router-dom"; 
import "./TopBar.css"; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch , faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function setActive(id) {
  if (id) {
    console.log(id); 
    if (document.getElementById(id)) {
      document.getElementById(id).className = 'active';
    }
    
  }
}; 

const TopBar = (params) => {

  let activeId = params["id"]
  React.useEffect(() => {
    setActive(activeId); 
  }, [])

  return (
    <>
      <div className="topnav">
        <a id="home" href="/home">Home</a>
        <a id="network" href="/network">Network</a>
        <a id="inbox" href="/inbox">Inbox</a>
        <a id="friends" href="/friends">Friends</a>
        <a id="profile" href="/profile">Profile</a>
        <a id="logout" href="/signin"><FontAwesomeIcon icon={faRightFromBracket} /></a>
        <div className="search-container">
          <form action="/search">
            <input type="text" placeholder="Search.." name="username"></input>
            <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
          </form>
        </div>
      </div>
    <Outlet />
    </>
  ); 
}; 

export default TopBar;