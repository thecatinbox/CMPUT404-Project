import React from "react";
import "./AddPost.css"; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage} from '@fortawesome/free-solid-svg-icons'
//line22-24: The option tag has an attribute of value that specifies a value that is submitted from the form when an option gets selected.
const AddPost = () => {

  const ENDPOINT = 'http://127.0.0.1:8000/server/authors/7dce957d-4ba2-4021-a76a-3ed8c4a06c97/posts/create/'

  const addPost = (title, content) => {

    const header = {
      "Content-Type": 'application/json',
      "Accept": 'application/json', 
      "Origin": 'http://localhost:3000', 
    }

    console.log(title); 
    console.log(content); 

    const body = JSON.stringify({
      "title": title,
      "description": "test_post_1",
      "contentType": "text/plain",
      "content": content,
      "author": "user1",
      "categories": "test_post_1",
      "count": 0,
      "published": "2020-04-01T00:00:00Z",
      "visibility": "PUBLIC",
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
      method: "PUT"
    }).catch(error => console.log(error.message));
  }

  return (
    <div className="post--container">
    <input id="post-title" className="title" type="text" placeholder="Title.." name="title" maxLength="60"></input>
    <textarea id="post-content" type="text" className="input-field" placeholder="Create a new post.." maxLength="450" size="450"></textarea>

    <div className="mainPost">
      <div className="upload-btn-wrapper">
        <button class="image-button">Upload images</button>
        <input id="inputFile" type="file" accept="image/*"/>
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