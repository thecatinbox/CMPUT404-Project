import React from "react";
import "./AddPost.css"; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage} from '@fortawesome/free-solid-svg-icons'
//line22-24: The option tag has an attribute of value that specifies a value that is submitted from the form when an option gets selected.
const AddPost = () => {

  const ENDPOINT = 'http://127.0.0.1:8000/authors/1/posts'

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
      id: "http://localhost:../authors/author_uuid/post/post_uuid",
      source: "http://localhost:../authors/author_uuid/post/post_uuid",
      origin: "http://localhost:../authors/author_uuid/post/post_uuid",
      description: "test_post_1",
      contentType: "text/plain",
      "content": content,
      author: "user1",
      categories: "test_post_1",
      count: 0,
      published: "2020-04-01T00:00:00Z",
      visibility: "PUBLIC",
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
    }).catch(error => console.log(error.message));
  }

  return (
    <div className="post--container">
    <input id="post-title" className="title" type="text" placeholder="Title.." name="title" maxLength="60"></input>
    <textarea id="post-content" type="text" className="input-field" placeholder="Create a new post.." maxLength="450" size="450"></textarea>

    <div className="mainPost">
      <div>
        <button> <FontAwesomeIcon icon={faImage} /></button>
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
        <button className="submit" onClick={() => addPost(document.getElementById("post-title").value, document.getElementById("post-content").value)}><b> Submit</b> </button> 
      </div>

      
    </div>
    
  </div>
  
  ); 
}; 

export default AddPost;
