import React from "react";
import { Outlet, Link } from "react-router-dom"; 
import "./TopBar.css"; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const TopBar = () => {
  return (
    <>
      <div className="topnav">
        <a className="active"><Link to="/">Home</Link></a>
        <a><Link to="/inbox">Inbox</Link></a>
        <a><Link to="/friends">Friends</Link></a>
        <a><Link to="/profile">Profile</Link></a>
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