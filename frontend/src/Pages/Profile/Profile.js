import Post from '../../Components/Post/Post'; 
import React, {useState, useEffect} from 'react';
import './Profile.css';
import TopBar from "../../Components/TopBar/TopBar";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Profile() {

  const [open, setOpen] = React.useState(false);
  const [postList, setPostList] = useState([]);
  const [userData, setUserData] = useState([]);

  // const ENDPOINT = 'http://127.0.0.1:8000/server/authors/7dce957d-4ba2-4021-a76a-3ed8c4a06c97/posts/'
  const app_url = localStorage.getItem('url'); 
  const uuid = localStorage.getItem('uuid'); 

  // console.log(uuid); 
  const POSTS_ENDPOINT = app_url + '/server/authors/' + uuid + '/posts/'; 
  const USER_ENDPOINT = app_url + '/server/authors/' + uuid + '/'; 

  const theme = createTheme({
    palette: {
      primary: {
        main: '#FF694B', 
      },
      secondary: {
        main: '#007DAA',
      }
    },
  });

  useEffect(() => { 
    fetch(POSTS_ENDPOINT, {
      headers: { "Accept": "application/json" },
      method: "GET"
    }).then(response => response.json()).then(postData => {
      setPostList(postData.items);
      // console.log(postData); 
    }); 

    fetch(USER_ENDPOINT , {
      headers: { "Accept": "application/json" },
      method: "GET"
    }).then(response => response.json()).then(userData => {
      setUserData(userData.items);
    }); 
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // <img src={userData.profileImage} alt="Profile Image"></img>
  return (
    <>
      <TopBar id="profile"/>
      <ThemeProvider theme={ theme }>
      <Box sx={{  bgcolor: "#E6EAF3", height: '100%', minHeight: '100vw' }}>
      <div className="profile">
      <div className="profile-center">
        <div className='profile-data'>
          <img src="https://i.imgur.com/k7XVwpB.jpeg" alt="Profile Image"></img>
          <Typography variant="h2" sx={{ color: "#007DAA"}}>{userData.displayName}</Typography>
          <Button onClick={handleClickOpen} sx={{backgroundColor: "#FF694B", color: "#FFFFFF"}}>Edit Profile</Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ color: "#007DAA" }}>Edit User Profile</DialogTitle>
            <DialogContent>
              <TextField margin="dense" id="displayName}" label="Display Name" defaultValue={userData.displayName} variant="standard" fullWidth/>
              <TextField margin="dense" id="github" label="GitHub URL" defaultValue={userData.github} variant="standard" fullWidth/>
              <TextField margin="dense" id="profileImage" label="Profile Image URL" defaultValue={userData.profileImage} variant="standard" fullWidth/>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>

        <div className='post-data'>
          {postList.map(function(post){
              return <Post post={post} key={post.id}/>;
          })}
        </div>
        </div>
      </div>
      </Box>
      </ThemeProvider>
    </>
  );
}

export default Profile;