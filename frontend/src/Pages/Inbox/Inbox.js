import './Inbox.css';
import Message from '../../Components/Message/Message'; 
import MessageList from '../../Components/MessageList/MessageList'; 
import TopBar from "../../Components/TopBar/TopBar";
// import * as React from 'react';
import React, {useState, useEffect} from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import EmailIcon from '@mui/icons-material/Email';
import PeopleIcon from '@mui/icons-material/People';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';

function Inbox() {
  const app_url = localStorage.getItem('url'); 
  const uuid = localStorage.getItem('uuid'); 
  // console.log(uuid); 
  const ENDPOINT = 'http://' + app_url + '/server/authors/' + uuid + '/inbox'; 
  
  const [messageList, setMessageList] = useState([]);
  const [open, setOpen] = React.useState({
    openPost: false,
    openComment: false,
    openFollow: false,
    openLike: false,
  });

  useEffect(() => {
    fetch(ENDPOINT, {
      headers: { "Accept": "application/json" },
      method: "GET"
    }).then(response => response.json()).then(postData => {
      setMessageList(postData.items);
    });
  })

  const handleClick = (property) => {
    setOpen((prevState) => ({ ...prevState, [property]: !prevState[property] }));
  };
  
  return (
    <>
    <TopBar id="inbox"/>
    <div className="inbox">
    <List
      sx={{ width: '100%', minWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Message List 
        </ListSubheader>
      }
    >

    {messageList && 
    <>
      <ListItemButton onClick={() => handleClick("openPost")}>
        <ListItemIcon>
          <EmailIcon />
        </ListItemIcon>
      <ListItemText primary="Post" />
        {open.openPost ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.openPost} timeout="auto" unmountOnExit>
        <MessageList messageList={messageList[0]} type={"post"}/>
      </Collapse>

      <ListItemButton onClick={() => handleClick("openComment")}>
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
      <ListItemText primary="Comment" />
        {open.openComment ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.openComment} timeout="auto" unmountOnExit>
        <MessageList messageList={messageList[1]} type={"comment"}/>
      </Collapse>

      <ListItemButton onClick={() => handleClick("openFollow")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
      <ListItemText primary="Follow" />
        {open.openFollow ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.openFollow} timeout="auto" unmountOnExit>
        <MessageList messageList={messageList[2]} type={"follow"}/>
      </Collapse>
      
      <ListItemButton onClick={() => handleClick("openLike")}>
        <ListItemIcon>
          <FavoriteIcon />
        </ListItemIcon>
      <ListItemText primary="Like" />
        {open.openLike ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.openLike} timeout="auto" unmountOnExit>
        <MessageList messageList={messageList[3]} type={"like"}/>
      </Collapse>
      </>
      }
      
    </List>
    </div>
    </>
  );
}

export default Inbox;