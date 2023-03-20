import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faChevronDown, faComment, faShare} from '@fortawesome/free-solid-svg-icons'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Comment from '../Comment/Comment'; 

import "./Post.css"; 

const comments = [
{"user": "user1", "comment": "this is a comment"}, 
{"user": "user2", "comment": "this is a comment"}, 
{"user": "user1", "comment": "this is a comment"}, 
]

function Post({post}) { 

  /* https://mui.com/material-ui/react-menu/ */ 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const uuid = localStorage.getItem('uuid'); 
  const puid = post.uuid; 
  var ENDPOINT = "http://127.0.0.1:8000/server/authors/" + uuid + "/posts/" +  puid + "/"; 
  // console.log(ENDPOINT); 
  
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    console.log(inputs); 
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /* https://mui.com/material-ui/react-dialog/ */ 
  const [editOpen, setEditOpen] = React.useState(false);

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditSave = () => {

    const header = {
      "Content-Type": 'application/json',
      "Accept": 'application/json', 
      "Origin": 'http://localhost:3000'
    }

    console.log(inputs.title); 
    console.log(inputs.content); 

    const body = JSON.stringify({
      "title": inputs.title,
      "content": inputs.content,
      "visibility": "PUBLIC"
    }); 

    // console.log(header); 
    console.log(body); 

    fetch(ENDPOINT, {
      headers: header,
      body: body, 
      method: "PUT"
    }).then((response) => {
      // console.log(response); 
      // window.location.reload(false);
    }).catch((error) => {
      console.log('error: ' + error);
    }); 

    setEditOpen(false);
  };

  return (
    <div className='post'>
      <Card sx={{ minWidth: 275 }}>
        <CardActions disableSpacing
          sx={{
            alignSelf: "stretch",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            p: 0,
          }}>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleEditOpen}>Edit Post</MenuItem>
              <MenuItem onClick={handleClose}>Delete Post</MenuItem>
            </Menu>

            <Dialog open={editOpen} onClose={handleEditClose}>
              <DialogTitle>Edit Post</DialogTitle>
              <DialogContent>
                <TextField margin="dense" id="title" label="Title" defaultValue={post.title} variant="standard" onChange={handleChange} fullWidth/>
                <TextField margin="dense" id="content" label="Post Content" defaultValue={post.content} onChange={handleChange} variant="standard" fullWidth/>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleEditClose}>Cancel</Button>
                <Button onClick={handleEditSave}>Save</Button>
              </DialogActions>
            </Dialog>
          </div>
        </CardActions>
        
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {post.author.displayName}
          </Typography>
          <Typography variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {post.published}
          </Typography>
          <Typography variant="body2">
            {post.content}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton>
            <FontAwesomeIcon icon={faHeart} />
          </IconButton>
          <IconButton>
            <FontAwesomeIcon icon={faComment} />
          </IconButton>
          <IconButton>
            <FontAwesomeIcon icon={faShare} />
          </IconButton>
          <TextField hiddenLabel id="comment-text" size="small" label="Comment" variant="outlined" />
          <Button size="small">Send</Button>
        </CardActions>


        {/* <CardContent>
          {comments.map(function(comment){
            return (<Typography variant="body2">
              {comment.comment}
            </Typography>)
        })}
          
        </CardContent> */}
        <CardContent>
          {comments.map(function(comment){
            return (<Comment comment={comment} key={comment.id}/>)
          })}
          
        </CardContent>
      </Card>
    </div>
  );
}

export default Post;
