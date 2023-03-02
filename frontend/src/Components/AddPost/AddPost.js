import React from "react";
import "./AddPost.css"; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faChevronDown} from '@fortawesome/free-solid-svg-icons'

const AddPost = () => {
  return (
    <div className="post--container">
    <textarea type="text"  className="input-field" placeholder="Create a new post.." maxLength="400" size="450"></textarea>

    <div className="mainPost">
      <div>
        <button> <FontAwesomeIcon icon={faImage} /></button>
      </div>

      <div className="dropdown">
        <button><FontAwesomeIcon icon={faChevronDown} /> Public</button>  
        <div className="dropdown-content">
          <a href="#">Friends</a>
          <a href="#">Secret</a>
        </div>
      </div>

      <div>
        <button className="submit"><b> Submit</b> </button> 
      </div>

      
    </div>
    
  </div>
  
  ); 
}; 

export default AddPost;






            
        
