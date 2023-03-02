import React from "react";
import { Outlet, Link } from "react-router-dom"; 
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

  React.useEffect(() => {
    setActive(params["id"]); 
  }, [])

  return (
    <>
      <div className="topnav">
        <a id="home"><Link to="/">Home</Link></a>
        <a id="inbox"><Link to="/inbox">Inbox</Link></a>
        <a id="friends"><Link to="/friends">Friends</Link></a>
        <a id="profile"><Link to="/profile">Profile</Link></a>
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