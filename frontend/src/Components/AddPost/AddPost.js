import React, { useState } from 'react';
import "./AddPost.css"; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
//line22-24: The option tag has an attribute of value that specifies a value that is submitted from the form when an option gets selected.
const AddPost = () => {

  const uuid = localStorage.getItem('uuid'); 
  const app_url = localStorage.getItem('url'); 
  // console.log(app_url); 
  const ENDPOINT = app_url + '/post/authors/' + uuid + '/posts/create'; 
  // console.log(ENDPOINT); 

  const addPost = (title, content) => {

    if (!title) {
      alert("title is required for creating a post! "); 
      return; 
    }

    const header = {
      "Content-Type": 'application/json',
      "Accept": 'application/json', 
      "Origin": 'http://localhost:3000', 
      "Authorization": 'Basic ' + btoa('username1:123')
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

  
  //Users can preview Images. Did not write funtion for sending images to backend yet. (may add in line 87)
  const [imagePreview, setImagePreview] = useState([]);
  
  function previewImages(event) {
    const previewContainer = document.getElementById('image-preview-container');
   /*  const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = function (event) {
        const img = document.createElement('img');
        img.src = event.target.result;
        img.classList.add('preview-image');
        previewContainer.appendChild(img);
      };

      reader.readAsDataURL(file);
      setImagePreview((prevState) => [...prevState, file]);
    }
 */
		const file = event.target.files[0];

		// Create preview image
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(event) {
      
			setImagePreview(event.target.result);
		};
    

  }

  return (
    <div className="post-container">
     
      <input id="post-title" className="title" type="text" placeholder="Title.." name="title" maxLength="60" ></input>
      <textarea id="post-content" type="text" className="input-field" placeholder="Create a new post.." maxLength="450" size="450"></textarea>

      <div className="buttons-container">
        <input className="file-input"  type="file" id="image-upload" name="images[]" onChange={(event) => previewImages(event)} />
        <button className="upload-btn" onClick={() => document.getElementById('image-upload').click()}>Choose Images</button>
        <div>
						<img className="preview-image" src={imagePreview} onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src="";}} /><br />
					</div>
        {/* Dropdown */}
        <div className="dropdown">
          <label htmlFor="post-category"></label>
          <select name="post-category" id="post-category">
            <option value="PUBLIC" selected>Public</option>
            <option value="FRIENDS">Friends</option>
            <option value="PRIVATE">Private</option></select>
        </div>

        <div>
        <button className="submit-button" onClick={() => addPost(document.getElementById("post-title").value, document.getElementById("post-content").value)}><b> Submit</b> </button> 
        </div>
      </div>

      
      
					
			
      
    

    </div>
  );
}


export default AddPost;