import React from "react";
import "./Post.css"; 

const Post = () => {
  return (
    <div class="post--container">
    <textarea type="text"  class="input-field" placeholder="Create a new post.." maxlength="400" size="450"></textarea>

    <div style="display: flex;">
      <div>
        <button><i class="fa-solid fa-image"></i></button>
      </div>

      <div class="dropdown" style="margin-left: 57%;">
        <button><i class="fa-solid fa-chevron-down"></i> Public</button>  
        <div class="dropdown-content">
          <a href="#">Friends</a>
          <a href="#">Secret</a>
        </div>
      </div>

      <div>
        <button style="border-color: rgb(164, 223, 255); border: 1px solid; border-radius: 5px;"><b> Submit</b> </button> 
      </div>

      
    </div>
    
  </div>
  
  ); 
}; 

export default TopBar;






            
        
