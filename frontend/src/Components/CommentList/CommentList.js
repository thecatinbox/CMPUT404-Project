// import * as React from 'react';
import React, { useState, useEffect } from "react";
import Comment from '../Comment/Comment'; 
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function CommentList({post}) { 
    // Get comment list 
    const [commentList, setCommentList] = useState([]);

    // Handle input change 
    const [inputs, setInputs] = useState({});
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
        console.log(inputs); 
    };

    const uuid = localStorage.getItem('uuid'); 
    const puid = post.uuid; 
    const app_url = localStorage.getItem('url'); 
    
    var COMMENT_ENDPOINT = "http://" + app_url + "/server/authors/" + uuid + "/posts/" + puid + "/comments"; 
    var ADD_COMMENT_ENDPOINT = "http://" + app_url + "/post/authors/" + uuid + "/posts/" + puid + "/comment"; 
    
    async function fetchComments() {
        try {
        const response = await fetch(COMMENT_ENDPOINT, {
            headers: { "Accept": "application/json" },
            method: "GET"
        });
    
        const data = await response.json();
        setCommentList(data.items);
        } catch (error) {
        console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchComments(); 
    }); 

    
  // Handle add new comment 
  const handleNewComment = () => {

    console.log(inputs.comment); 
    const header = {
      "Content-Type": 'application/json',
      "Accept": 'application/json', 
      "Origin": 'http://localhost:3000'
    }

    console.log(inputs.comment); 
    console.log(inputs.content); 

    const body = JSON.stringify({
      "comment": inputs.comment,
    }); 

    // console.log(header); 
    console.log(body); 

    fetch(ADD_COMMENT_ENDPOINT, {
      headers: header,
      body: body, 
      method: "POST"
    }).catch((error) => {
      console.log('error: ' + error);
    }); 
  }

    return (
        <>
          <CardContent>
            {commentList.map(function(comment){
              return (<Comment comment={comment} key={comment.id}/>)
          })}
          </CardContent>
          <CardContent id="commentSession">
            <TextField style={{width: "90%"}} hiddenLabel name="comment" id="comment" size="small" label="Comment" variant="outlined" onChange={handleChange}/>
            <Button style={{width: "10%"}} size="small" onClick={handleNewComment}>Send</Button>
          </CardContent>
        </>
    );
}

export default CommentList;