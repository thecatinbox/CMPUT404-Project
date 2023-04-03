import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import { IconButton } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'

// const friends = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [friends, setFriends] = React.useState(""); 

  const app_url = localStorage.getItem('url'); 
  const ENDPOINT = app_url + '/service/authors/'; 

  // Get friend list (using user list as a temp)
  React.useEffect(() => {
    fetch(ENDPOINT, {
      headers: { "Accept": "application/json", "Authorization": 'Basic ' + btoa('username1:123') },
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        setFriends(data.items);
      });
  }, []);

  const handleClose = () => {
    onClose("");
  };

  const handleListItemClick = (user_url) => {
    onClose(user_url);
  };

  if (friends) {
  return ( 
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Select a friend to share with</DialogTitle>
        <List sx={{ pt: 0 }}>
          {friends.map(function(friend){
            return <>
            <ListItem disableGutters>
              <ListItemButton onClick={() => handleListItemClick(friend.url)} key={friend.username}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={friend.displayName} />
              </ListItemButton>
            </ListItem>
            </>
          })}
        </List>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

function Share( {post} ) {
  const [open, setOpen] = React.useState(false);
  const uuid = localStorage.getItem('uuid'); 
  const current_user = JSON.parse(localStorage.getItem('user')); 

  // Handle add new like
  const handleShare = (user_url) => {
    if (user_url == "") {return; }

    // const app_url = localStorage.getItem('url'); 
    var MESSAGE_ENDPOINT = user_url + '/inbox/'; 

    const header = {
      "Content-Type": 'application/json',
      "Accept": 'application/json', 
      "Authorization": 'Basic ' + btoa('username1:123'),
    }

    // Send like message to inbox 
    const body = JSON.stringify(
      { 
        "type": "post", 
        "sender": current_user, 
        "post": post
     }
    ); 

    console.log(body); 

    fetch(MESSAGE_ENDPOINT, {
      headers: header,
      body: body, 
      method: "POST"
    }).catch((error) => {
      console.log('error: ' + error);
    }); 
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    handleShare(value); 
  };


  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <FontAwesomeIcon icon={faShare} />
      </IconButton>
      <SimpleDialog
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

export default Share;