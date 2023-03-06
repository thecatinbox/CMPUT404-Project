import React from "react";
import "./AddPost.css"; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
//line22-24: The option tag has an attribute of value that specifies a value that is submitted from the form when an option gets selected.
const AddPost = () => {

  const uuid = localStorage.getItem('uuid'); 
  const ENDPOINT = 'http://127.0.0.1:8000/post/authors/' + uuid + '/posts/create'; 

  const addPost = (title, content) => {

    const header = {
      "Content-Type": 'application/json',
      "Accept": 'application/json', 
      "Origin": 'http://localhost:3000', 
    }

    console.log(title); 
    console.log(content); 

    const date = new Date().toJSON();

    const body = JSON.stringify({
      "title": title,
      "content": content,
      "categories": "test_post_1",
      "count": 0,
      "published": date,
      "visibility": "PUBLIC"
    }); 
    /*
    const body = JSON.stringify({
      title: new_post['title'],
      uuid: new_postId,
      id: id,
      source: new_post['source'],
      origin: new_post['origin'],
      description: new_post['description'],
      contentType: new_post['contentType'],
      content: new_post['content'],
      author: currentAuthor,
      Categories: new_post['categories'],
      count: 0,
      visibility: new_post['visibility'],
      unlisted: new_post['unlisted'],
      textType: new_post['contentType']
    })*/ 

    // console.log(header); 
    console.log(body); 

    fetch(ENDPOINT, {
      headers: header,
      body: body, 
      method: "POST"
    }).then((response) => {
      console.log(response.status); 
      if(!response.ok) throw new Error(response.status);
      else return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
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
        
          <option value="Public" selected>Public</option>
          <option value="Friends">Friends</option>
          <option value="Private" >Private</option>
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