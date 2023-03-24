// import * as React from 'react';
import React, { useState, useEffect } from "react";
import Comment from '../Comment/Comment'; 
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function CommentList({post}) { 
    // Get comment list 
    const [commentList, setCommentList] = useState([]);
    const [fetched, setFetched] = useState(false);

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
    
    var COMMENT_ENDPOINT = app_url + "/server/authors/" + uuid + "/posts/" + puid + "/comments"; 
    // var ADD_COMMENT_ENDPOINT = app_url + "/post/authors/" + uuid + "/posts/" + puid + "/comment"; 
    var MESSAGE_ENDPOINT = app_url + '/server/authors/' + post.author.uuid + '/inbox'; 
    console.log(MESSAGE_ENDPOINT); 
    
    async function fetchComments() {
        try {
        const response = await fetch(COMMENT_ENDPOINT, {
            headers: { "Accept": "application/json" },
            method: "GET"
        });
    
        const data = await response.json();
        setCommentList(data.items);
        setFetched(true); 
        } catch (error) {
        console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchComments(); 
    }); 

    async function handleNewComment() {
      try {
          const header = {
            "Content-Type": 'application/json',
            "Accept": 'application/json', 
            "Origin": 'http://localhost:3000'
          }
  
          // Send like message to inbox 
          const body = JSON.stringify(
            { 
              "type": "comment", 
              "comment": inputs.comment, 
              "userId": uuid, 
              "postId": puid
           }
          ); 
  
          console.log(body); 
  
          await fetch(MESSAGE_ENDPOINT, {
            headers: header,
            body: body, 
            method: "POST"
          }); 
  
          } catch (error) {
            console.error('Error:', error);
          }
    }

  // Handle add new comment 
  /* const handleNewComment = () => {

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
  }*/ 

    return (
        <>
        {fetched ? (
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
        ) : (
            <div id="loading" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <br/>
                <p>Loading comments...</p>
            </div>
        )}
        </>
    );
}

export default CommentList;