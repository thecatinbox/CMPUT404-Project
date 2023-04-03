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
  const [input, setInput] = useState({
    github: "",
    // profileImage: "",
    displayName: "",
  });

  // const ENDPOINT = 'http://127.0.0.1:8000/service/authors/7dce957d-4ba2-4021-a76a-3ed8c4a06c97/posts/'
  const app_url = localStorage.getItem("url");
  const uuid = localStorage.getItem("uuid");

  // console.log(uuid);
  const POSTS_ENDPOINT = app_url + "/service/authors/" + uuid + "/posts/";
  const USER_ENDPOINT = app_url + "/service/authors/" + uuid + "/";

  const theme = createTheme({
    palette: {
      primary: {
        main: "#FF694B",
      },
      secondary: {
        main: "#007DAA",
      },
    },
  });

  const fetchData = async () => {
    try {
      const userResponse = await fetch(USER_ENDPOINT, {
        headers: {
          Accept: "application/json",
          Authorization: "Basic " + btoa("username1:123"),
        },
        method: "GET",
      });
      const userData = await userResponse.json();
      setUserData(userData.items);

      const postsResponse = await fetch(POSTS_ENDPOINT, {
        headers: {
          Accept: "application/json",
          Authorization: "Basic " + btoa("username1:123"),
        },
        method: "GET",
      });
      const postsData = await postsResponse.json();
      setPostList(
        postsData.items.sort(
          (a, b) => new Date(a.published) - new Date(b.published)
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);

    fetch(USER_ENDPOINT, {
      headers: {
        Accept: "application/json",
        Authorization: "Basic " + btoa("username1:123"),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(input),
    });

    fetchData();
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [id]: value,
    }));
    // console.log(input); 
  };

  return (
    <>
      <TopBar id="profile" />
      <ThemeProvider theme={theme}>
        {/* <Box sx={{  bgcolor: "#E6EAF3", height: '100%', minHeight: '100vw' }}> */}
        <div className="profile">
          <div className="profile-center">
            <div className="profile-data">
              {userData.profileImage ? (
                <img
                id="profileImage"
                src={userData.profileImage}
                alt="Profile Image"
              ></img>
              ) : (
                <img
                  id="profileImage"
                  src="https://i.imgur.com/GvsgVco.jpeg"//{userData.profileImage}
                  alt="Profile Image"
                ></img>
              )}
              
              <Typography
                variant="h2"
                sx={{ color: "#007DAA" }}
              >
                {userData.displayName}
              </Typography>
              <br/>
              <Button
                onClick={handleClickOpen}
                sx={{ backgroundColor: "#FF694B", color: "#FFFFFF" }}
              >
                Edit Profile
              </Button>
              <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ color: "#007DAA" }}>Edit User Profile</DialogTitle>
            <DialogContent>
              <TextField margin="dense" id="displayName" label="Display Name" defaultValue={userData.displayName} variant="standard" onChange={handleInputChange} fullWidth/>
              <TextField margin="dense" id="github" label="GitHub URL" defaultValue={userData.github} variant="standard" onChange={handleInputChange} fullWidth/>
              {/*<TextField margin="dense" id="profileImage" label="Profile Image URL" defaultValue={userData.profileImage} onChange={handleInputChange} variant="standard" fullWidth/> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
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
      {/* </Box> */}
      </ThemeProvider>
    </>
  );
}

export default Profile;