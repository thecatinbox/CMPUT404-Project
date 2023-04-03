import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faChevronDown, faComment, faShare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import "./Post.css"; 
import CommentList from "../CommentList/CommentList";
import Like from "../Like/Like";
import Share from "../Share/Share";
import Username from "../Username/Username";

function Post({post}) { 

  /* https://mui.com/material-ui/react-menu/ */ 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const uuid = localStorage.getItem('uuid'); 
  const post_uuid = post.author.uuid; 
  const puid = post.uuid; 
  // const app_url = localStorage.getItem('url'); 
  const user_url = post.author.url; 

  var POST_ENDPOINT = user_url + "/posts/" + puid + "/"; 
  // var LIKE_ENDPOINT = user_url + "/posts/" + puid + "/likes/"; 
  var MESSAGE_ENDPOINT = user_url + '/inbox/'; 
  // console.log(MESSAGE_ENDPOINT); 
  
  // const [likeNum, setLikeNum] = useState();
  // const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  // const [isDataFetched, setIsDataFetched] = useState(false);

  const theme = createTheme({
    palette: {
      text: {
        primary: '#007DAA',
        secondary: "#79B3C1",
      },
      primary: {
        main: '#FF694B', 
      },
      secondary: {
        main: '#007DAA',
      }
    },
  });

  /*
  async function fetchLikes() {
    try {
      if (LIKE_ENDPOINT.includes("cmput404-project-data.herokuapp.com")) {
        const response = await fetch(LIKE_ENDPOINT, {
          headers: { "Accept": "application/json", "Authorization": 'Basic ' + btoa('username1:123') },
          method: "GET"
        });
    
        const data = await response.json();
        setLikeNum(data.total_likes); 
  
        const isLikedByCurrentUser = data.items.some(item => item.author && item.author.uuid === uuid);
        if (isLikedByCurrentUser) {
          setLiked(true); 
        }
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  
  useEffect(() => {
    if (!isDataFetched) {
      fetchLikes(); 
      setIsDataFetched(true); 
    } 
  }); */
  
  // Handle input change 
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    console.log(inputs); 
  };

  // Handle add new like
  async function handleNewLike() {
    if (liked == false) {
      try {
        const header = {
          "Content-Type": 'application/json',
          "Accept": 'application/json', 
          "Origin": 'http://localhost:3000', 
          "Authorization": 'Basic ' + btoa('username1:123')
        }

        // Send like message to inbox 
        const body = JSON.stringify(
          { 
            "type": "like", 
            "p_or_c": "post", 
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

        setIsDataFetched(false); 

        } catch (error) {
          console.error('Error:', error);
        }
      
    }
  }

  /* 
  const handleNewLike = () => {
    if (liked == false) {
      const header = {
        "Content-Type": 'application/json',
        "Accept": 'application/json', 
        "Origin": 'http://localhost:3000'
      }

      const body = JSON.stringify({ "context": "" }); 

      fetch(ADD_LIKE_ENDPOINT, {
        headers: header,
        body: body, 
        method: "POST"
      }).catch((error) => {
        console.log('error: ' + error);
      }); 
    }
  } */ 

  // Handle right top menu 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(POST_ENDPOINT); 
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /* https://mui.com/material-ui/react-dialog/ */ 
  const [editOpen, setEditOpen] = React.useState(false);

  const handleEditOpen = () => {
    console.log(puid); 
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditSave = () => {
    const header = {
      "Content-Type": 'application/json',
      "Accept": 'application/json', 
      "Origin": 'http://localhost:3000', 
      "Authorization": 'Basic ' + btoa('username1:123')
    }

    // console.log(inputs.title); 
    // console.log(inputs.content); 

    const body = JSON.stringify({
      "title": inputs.title,
      "content": inputs.content 
    }); 

    // console.log(header); 
    console.log(body); 

    fetch(POST_ENDPOINT, {
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

  const handleDelete = () => {
    const header = {
      "Content-Type": 'application/json',
      "Accept": 'application/json', 
      "Origin": 'http://localhost:3000', 
      "Authorization": 'Basic ' + btoa('username1:123'),
    }

    fetch(POST_ENDPOINT, {
      headers: header,
      method: "DELETE"
    }).catch((error) => {
      console.log('error: ' + error);
    }); 
  };

  // Github Activity
  const [openGithub, setOpenGithub] = useState(false);
  const [githubActivityList, setGithubActivityList] = useState([]);

  // githubActivityList = 

  var parser = document.createElement('a');
  parser.href = post.author.github;
  var githubUsername = parser.pathname.replace('/', '');

  var GITHUB_ENDPOINT = user_url + "/github/";

  async function fetchGithubData() {
    try {
      const response = await fetch(GITHUB_ENDPOINT, {
        headers: { "Accept": "application/json", "Authorization": 'Basic ' + btoa('username1:123') },
        method: "GET"
      });
      // test url
      // "http://127.0.0.1:8000/service/authors/4e886755-295b-4a9f-9251-3c71732e9f5e/github/"
      // "http://127.0.0.1:8000/service/authors/5fefed37-47b8-4d0f-a427-bbe218a9c979/github/"
  
      const githubData = await response.json();
      setGithubActivityList(githubData["github_activity"]);
      console.log(githubData["github_activity"]);
    } catch (error) {
      console.error('Error:', error);
      // Handle the error here
    }
  }

  const handleClickOpenGithub = () => {
    setOpenGithub(true);
    fetchGithubData(); 
  };
  const handleCloseGithub = () => {
    setOpenGithub(false);
  };

  function timeSince(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + " year" + (interval > 1 ? "s" : "") + " ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " month" + (interval > 1 ? "s" : "") + " ago";
    }
    interval = Math.floor(seconds / 604800);
    if (interval >= 1) {
      return interval + " week" + (interval > 1 ? "s" : "") + " ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " day" + (interval > 1 ? "s" : "") + " ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hour" + (interval > 1 ? "s" : "") + " ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " minute" + (interval > 1 ? "s" : "") + " ago";
    }
    return "just now";
  }

  function GithubActivity({activity}) {
    return (
      <Box gutterBottom style={{ display: 'flex',
                                  alignItems: 'center',
                                  flexWrap: 'wrap',
                                  alignSelf: 'center',
                                  borderBottom:'1px dashed #007DAA', 
                                  }}>
        <Typography id="githubName" 
                    sx={{ color: "#22A2BB",
                          size: 0.5,
                          marginRight: 2,
                          fontSize: "90%" }}> 
          {activity["actor"]["login"]} 
        </Typography>

        <Typography id="githubEvent"> {activity["type"].replace("Event", "")} </Typography>
        <Typography id="githubRepo" sx={{ fontSize: "90%", margin: 2 }}> 
          <a href={"https://github.com/" + activity["repo"]["name"]}>
            {activity["repo"]["name"]}
          </a> 
        </Typography>

        <Typography id="githubTime"
                    sx={{ color: "#22A2BB",
                    fontSize: "90%"}}> 
            {timeSince(activity["created_at"])} 
        </Typography>
      </Box>
    );
  }

  
  


  return (
    <div className='post'>
      <ThemeProvider theme={ theme }>
      <Card sx={{ minWidth: 275 }}>
        <CardActions disableSpacing
          sx={{
            alignSelf: "stretch",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            p: 0,
          }}>
          {post_uuid===uuid ? ( // Display a loading message while isLoading is true

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
              <MenuItem onClick={handleDelete}>Delete Post</MenuItem>
            </Menu>

            <Dialog open={editOpen} onClose={handleEditClose} fullScreen >
              <DialogTitle>Edit Post</DialogTitle>
              <DialogContent>
                <TextField margin="dense" name="title" id="title" label="Title" defaultValue={post.title} variant="standard" onChange={handleChange} fullWidth/>
                <TextField margin="dense" name="content" id="content" label="Post Content" defaultValue={post.content} onChange={handleChange} variant="standard" fullWidth/>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleEditClose}>Cancel</Button>
                <Button onClick={handleEditSave}>Save</Button>
              </DialogActions>
            </Dialog>
          </div>) : (
          <div></div> 
          )}
        </CardActions>
        
        <CardContent>
          <div style={{ display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}>
            <Typography sx={{ fontSize: 14, mr: 1.5 }} color="text.secondary" gutterBottom>
              <Username user={post.author}/>     
            </Typography>
            
            <FontAwesomeIcon id="fa-github" icon={ faGithub } onClick={ handleClickOpenGithub } />
            <Dialog onClose={ handleCloseGithub }
                             open={ openGithub }>
              <DialogTitle onClose={ handleCloseGithub } >
                <div style={{ display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}>
                  <a href={ post.author.github } style={{ marginRight: 3 }}>
                    <FontAwesomeIcon id="fa-github" 
                                    icon={ faGithub } 
                                    href={ post.author.github } />
                  </a>
                  {post.author.github ? 
                    <Typography gutterBottom style={{ marginLeft: 3 }}>
                      {post.author.displayName}'s Github Activities
                      <br/>
                      GitHub username: {githubUsername}
                    </Typography> :
                    <Typography gutterBottom >
                      Github Activities
                    </Typography>
                  }
                          
                  {/* <Typography >Github Activities</Typography> */}
                  <DialogActions style={{ alignSelf: 'flex-end' }}>
                    <FontAwesomeIcon id="fa-xmark" 
                                     icon={ faXmark } 
                                     onClick={ handleCloseGithub } />
                  </DialogActions>
                </div>
              </DialogTitle>
              <DialogContent dividers>
                {post.author.github ? 
                  githubActivityList.map(function(activity){
                    return <GithubActivity activity={activity} key={activity.id}/>;
                  }) :
                    <Typography gutterBottom >
                    Sorry,<br/>
                      {post.author.displayName} doesn't have GitHub...
                  </Typography>
                }
              </DialogContent>
          </Dialog>
          </div>
          <Typography variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {post.published.slice(0, 10)}
          </Typography>
          <Typography variant="body2">
            {post.content}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <Like post={post}/>
          <IconButton onClick={() => setShowComments(!showComments)}>
            <FontAwesomeIcon icon={faComment} />
          </IconButton>
          <Share post={post}/>
        </CardActions>

        {showComments && <CommentList post={post}/> }

      </Card>
      </ThemeProvider>
    </div>
  );
}

export default Post;
