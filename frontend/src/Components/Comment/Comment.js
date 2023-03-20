import React, { useState } from "react";

import { IconButton } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import "./Comment.css";

function Comment({comment}) { 
    return (
        <div className="comment">
            <IconButton className="likeComment" > 
                <FontAwesomeIcon icon={faHeart} />
            </IconButton>
            <div className="commentText">
                <h4 className="userName" > {comment.author.displayName} </h4>
                <div className="userComment" > {comment.comment} </div>
            </div>
        </div>
    );
}

export default Comment;