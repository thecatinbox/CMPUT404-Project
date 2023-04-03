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
  const [file, setFile] = useState(null);

  function handleTypeChange(event) {
    setSelectedType(event.target.value);
    setShowImageBox(event.target.value === 'image');
  }

  /*
  function previewImages(event) {
	  const file = event.target.files[0];

		const reader = new FileReader();
    
		reader.onload = function(event) {
      
			setImagePreview(reader.result);
      
		};
    if (file) {
      reader.readAsDataURL(file);
    }

  }*/ 

  const previewImages = (event) => {
    setFile(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageSrc = e.target.result;
      setImagePreview(imageSrc);
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  
  function getTypeOf(value) {
    return typeof value;
  }  

  const addPost = () => {

    let title = ""; 
    if (!document.getElementById("post-title").value) {
      alert("title is required for creating a post! "); 
      return; 
    } else {
      title = document.getElementById("post-title").value; 
    }

    const header = {
      "Content-Type": 'application/json',
      "Accept": 'application/json', 
      "Origin": 'http://localhost:3000', 
      "Authorization": 'Basic ' + btoa('username1:123')
    }
    
    var typeSelected = document.getElementById("content-type");
    var type = typeSelected.options[typeSelected.selectedIndex].value;

    var e = document.getElementById("post-visibility");
    var visibility = e.options[e.selectedIndex].value;

    let body = ""; 
    if ( type.includes("text") ) {
      const content = document.getElementById("post-content").value

      body = JSON.stringify({
        "title": title,
        "content": content,
        "content_type": type,
        "visibility": visibility,
      }); 
  
      console.log(body); 
    } else {
          
      // const image = JSON.stringify(imagePreview);
      const image = document.getElementById("preview-image").src; 
      console.log(getTypeOf(image));
      console.log(image);

      const content = {
        "title": title, 
        "content_type": type, 
        "visibility": visibility,
        "contentImage": image
      }; 

      body = JSON.stringify(content); 
      console.log(body);
    }

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
          <option value="image">Image</option></select>
      </div>

      {/* Dropdown for visibility*/}
      <div className="dropdown">
        <a>Visibility: </a>
          <select id="post-visibility">
            <option value="PUBLIC" selected>Public</option>
            <option value="FRIENDS">Friends</option>
            <option value="PRIVATE">Private</option></select>
      </div>

      <input id="post-title" className="title" type="text" placeholder="Title.." name="title" maxLength="60" ></input>
      {showImageBox ? (
        <div>
          <input className="file-input" type="file" id="image-upload" name="images[]" onChange={(event) => previewImages(event)}/>
          <button className="upload-btn" onClick={() => document.getElementById('image-upload').click()}>Choose Images</button>
          {imagePreview && (
            <div>
              <img className="preview-image" id="preview-image" src={imagePreview} onError={({ currentTarget }) => {
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

      <button className="submit-button" onClick={() => addPost()}><b> Submit</b> </button> 

    </div>
  );
}
export default AddPost;