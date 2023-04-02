import React, { useState } from 'react';
import "./AddPost.css"; 

const AddPost = () => {

  const uuid = localStorage.getItem('uuid'); 
  const app_url = localStorage.getItem('url'); 
  // console.log(app_url); 
  const ENDPOINT = app_url + '/post/authors/' + uuid + '/posts/create'; 
  // console.log(ENDPOINT); 

  const [selectedType, setSelectedType] = useState('text');
  const [showImageBox, setShowImageBox] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);

  function handleTypeChange(event) {
    setSelectedType(event.target.value);
    setShowImageBox(event.target.value === 'image/png;base64'||event.target.value === 'image/jpeg;base64');
  }

  function previewImages(event) {
	  const file = event.target.files[0];

		const reader = new FileReader();
    
		reader.onload = function(event) {
      
			setImagePreview(reader.result);
      
		};
    if (file) {
      reader.readAsDataURL(file);
    }

  }

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
    var typeSelected=document.getElementById("content-type");
    var type = typeSelected.options[e.selectedIndex].value;

    var e = document.getElementById("post-visibility");
    var visibility = e.options[e.selectedIndex].value;
    var image = null;

    // console.log(content); 
    
    if (imagePreview!==undefined || imagePreview!==null) {
      image = document.getElementById("preview-image").value;
    }
    console.log(document.getElementById("preview-image").value);

    const body = JSON.stringify({
      "title": title,
      "content": content,
      "content_type": type,
      "visibility": visibility,
      "contentImage": image
    }); 


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
    <div className="post-container">
      <div className="dropdown">
        <a>Content Type: </a>
        <select id="content-type" value={selectedType} onChange={handleTypeChange}>
          <option value="text/plain" selected>Text (plain)</option>
          <option value="text/markdown">Text (markdown)</option>
          <option value="image/png;base64">Image (png)</option>
          <option value="image/jpeg;base64">Image (jpeg)</option></select>
      </div>

      {/* Dropdown for visibility*/}
      <div className="dropdown">
        <a>Visibility: </a>
          <select id="post-visibility">
            <option value="PUBLIC" selected>Public</option>
            <option value="FRIENDS">Friends</option>
            <option value="PRIVATE">Private</option></select>
      </div>
      <button className="submit-button" onClick={() => addPost(document.getElementById("post-title").value, document.getElementById("post-content").value)}><b> Submit</b> </button> 
        

      <input id="post-title" className="title" type="text" placeholder="Title.." name="title" maxLength="60" ></input>
      {showImageBox ? (
        <div>
          <input className="file-input" type="file" id="image-upload" name="images[]" onChange={(event) => previewImages(event)}/>
          <button className="upload-btn" onClick={() => document.getElementById('image-upload').click()}>Choose Images</button>
          {imagePreview && (
            <div>
              <img className="preview-image" src={imagePreview} onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "";
              } } /><br />
            </div>
            )}

        </div>
        ) : (
          <div>
            <textarea id="post-content" type="text" className="input-field" placeholder="Create a new post.." maxLength="450" size="450"></textarea>
          </div>
        )}

    </div>
  );
}
export default AddPost;