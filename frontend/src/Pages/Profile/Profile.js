import Post from '../../Components/Post/Post'; 
import React, {useState, useEffect} from 'react';
import './Profile.css';
import TopBar from "../../Components/TopBar/TopBar";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function Profile() {

  const [open, setOpen] = React.useState(false);
  const [postList, setPostList] = useState([]);
  const [userData, setUserData] = useState([]);

  // const ENDPOINT = 'http://127.0.0.1:8000/server/authors/7dce957d-4ba2-4021-a76a-3ed8c4a06c97/posts/'
  const uuid = localStorage.getItem('uuid'); 
  // console.log(uuid); 
  const POSTS_ENDPOINT = 'http://127.0.0.1:8000/server/authors/' + uuid + '/posts/'; 
  const USER_ENDPOINT = 'http://localhost:8000/server/authors/' + uuid + '/'; 

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

  return (
    <>
      <TopBar id="profile"/>
      <div className="profile">
        <div className='profile-data'>
          <img src={userData.profileImage} alt="Profile Image"></img>
          <h2>{userData.displayName}</h2>
          <button onClick={handleClickOpen}>Edit Profile</button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit User Profile</DialogTitle>
            <DialogContent>
              <TextField margin="dense" id="displayName}" label="Display Name" value={userData.displayName} variant="standard" fullWidth/>
              <TextField margin="dense" id="github" label="GitHub URL" value={userData.github} variant="standard" fullWidth/>
              <TextField margin="dense" id="profileImage" label="Profile Image URL" value={userData.profileImage} variant="standard" fullWidth/>
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
    </>
  );
}

export default Profile;