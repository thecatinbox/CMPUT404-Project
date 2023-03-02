import React from "react";
import "./AddPost.css"; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage} from '@fortawesome/free-solid-svg-icons'
//line22-24: The option tag has an attribute of value that specifies a value that is submitted from the form when an option gets selected.
const AddPost = () => {
  return (
    <div class="post--container">
    <input class="title" type="text" placeholder="Title.." name="title" maxlength="60"></input>
    <textarea type="text"  class="input-field" placeholder="Create a new post.." maxlength="450" size="450"></textarea>

    <div className="mainPost">
      <div>
        <button> <FontAwesomeIcon icon={faImage} /></button>
      </div>
      
      <div className="dropdown">
        <label for="post-category"></label>
        <select name="post-category" id="post-category">
        
          <option value="Public" selected>Public</option>
          <option value="Friends">Friends</option>
          <option value="Secret" >Secret</option>
        </select>
      </div>

      <div>
        <button className="submit"><b> Submit</b> </button> 
      </div>

      
    </div>
    
  </div>
  
  ); 
}; 

export default AddPost;
