import React from "react";
import { Outlet } from "react-router-dom"; 
import "./TopBar.css"; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function setActive(id) {
  if (id) {
    console.log(id); 
    document.getElementById(id).className = 'active';
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
        <a id="home" href="/">Home</a>
        <a id="inbox" href="/inbox">Inbox</a>
        <a id="friends" href="/friends">Friends</a>
        <a id="profile" href="/profile">Profile</a>
        <div className="search-container">
          <form action="/action_page.php">
            <input type="text" placeholder="Search.." name="search"></input>
            <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
          </form>
        </div>
      </div>
    <Outlet />
    </>
  ); 
}; 

export default TopBar;