import React from "react";
import "./AddPost.css"; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
//line22-24: The option tag has an attribute of value that specifies a value that is submitted from the form when an option gets selected.
const AddPost = () => {

  const uuid = localStorage.getItem('uuid'); 
  const app_url = localStorage.getItem('url'); 
  // console.log(app_url); 
  const ENDPOINT = 'http://' + app_url + '/post/authors/' + uuid + '/posts/create'; 
  // console.log(ENDPOINT); 

  const addPost = (title, content) => {

    if (!title) {
      alert("title is required for creating a post! "); 
      return; 
    }

    const header = {
      "Content-Type": 'application/json',
      "Accept": 'application/json', 
      "Origin": 'http://localhost:3000'
    }

    var e = document.getElementById("post-category");
    var visibility = e.options[e.selectedIndex].value;

    // console.log(title); 
    // console.log(content); 
    // console.log(visibility); 

    const body = JSON.stringify({
      "title": title,
      "content": content,
      "visibility": visibility
    }); 

    // console.log(header); 
    console.log(body); 

    fetch(ENDPOINT, {
      headers: header,
      body: body, 
      method: "POST"
    }).then((response) => {
      console.log(response); 
    }).catch((error) => {
      console.log('error: ' + error);
    }); 
    
    // .catch(error => console.log(error.message));
  }

  return (
    <div className="post--container">
    <input id="post-title" className="title" type="text" placeholder="Title.." name="title" maxLength="60"></input>
    <textarea id="post-content" type="text" className="input-field" placeholder="Create a new post.." maxLength="450" size="450"></textarea>

    <div className="mainPost">
      <div className="upload-btn-wrapper">
        <input type="file" id="actual-btn"/>
        <label for="actual-btn"><FontAwesomeIcon icon={faImage} /> Choose Image</label>
      </div>
      
      <div className="dropdown">
        <label htmlFor="post-category"></label>
        <select name="post-category" id="post-category">
          <option value="PUBLIC" selected>Public</option>
          <option value="FRIENDS">Friends</option>
          <option value="PRIVATE">Private</option>
        </select>
      </div>

      <div>
        <button className="submit-button" onClick={() => addPost(document.getElementById("post-title").value, document.getElementById("post-content").value)}><b> Submit</b> </button> 
      </div>

      
    </div>
    
  </div>
  
  ); 
}; 

export default AddPost;