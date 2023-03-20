import React, { useState } from "react";

import { IconButton } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import "./Comment.css";

function Comment({comment}) { 

    // const [inputs, setInputs] = useState({});
    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    //     console.log(inputs); 
    // };
    // const userName = "123";
    // const userComment = "hello";
    // const likeNum = 10;

    return (
        <div className="comment">
            <IconButton className="likeComment" > 
                <FontAwesomeIcon icon={faHeart} />
            </IconButton>
            <div className="commentText">
                <h4 className="userName" > user </h4>
                <div className="userComment" > Hello World </div>
            </div>
            
            
        </div>
    );
}

export default Comment;