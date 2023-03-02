import React from "react";
import "./AddPost.css"; 

const AddPost = () => {
  return (
    <div className="post--container">
    <script src="https://kit.fontawesome.com/68d79784aa.js" crossorigin="anonymous"></script>
    <textarea type="text"  className="input-field" placeholder="Create a new post.." maxLength="400" size="450"></textarea>

    <div className="mainPost">
      <div>
        <button><i className="fa-solid fa-image"></i></button>
      </div>

      <div className="dropdown">
        <button><i className="fa-solid fa-chevron-down"></i> Public</button>  
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






            
        
