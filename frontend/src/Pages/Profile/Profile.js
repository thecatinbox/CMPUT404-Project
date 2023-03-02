import Post from '../../Components/Post/Post'; 
import * as React from 'react';
import './Profile.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const userData = {
  "type":"author",
  "id":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
  "host":"http://127.0.0.1:5454/",
  "displayName":"Lara Croft",
  "url":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
  "github": "http://github.com/laracroft",
  "profileImage": "https://i.imgur.com/k7XVwpB.jpeg"
}


const postData = [
  {
    author: "Username1", 
    title: "Title1", 
    date: "2023-02-28", 
    content: "This is my first post. Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
  },
  {
    author: "Username1", 
    title: "Title2", 
    date: "2023-02-28", 
    content: "This is my second post. Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
  },
];

function Profile() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="profile">
      <div className='profile-data'>
        <img src={userData.profileImage} alt="Image Description"></img>
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
        {postData.map(function(post){
            return <Post post={post}/>;
        })}
      </div>
    </div>
  );
}

export default Profile;