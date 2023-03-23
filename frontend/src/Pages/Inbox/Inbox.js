import './Inbox.css';
import Message from '../../Components/Message/Message'; 
import TopBar from "../../Components/TopBar/TopBar";
import * as React from 'react';
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

const messageData = [
  {
    id: 1, 
    content: "Username1 liked your post"
  },
  {
    id: 2, 
    content: "Username2 wants to follow you"
  },
  {
    id: 3, 
    content: "Username3 commented on your post"
  },
];

function Inbox() {
  const [open, setOpen] = React.useState({
    openPost: true,
    openLike: true,
    openComment: true,
    openFollow: true,
  });

  console.log(open.openComment); 

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
      
      <ListItemButton onClick={() => handleClick("openPost")}>
        <ListItemIcon>
          <EmailIcon />
        </ListItemIcon>
      <ListItemText primary="Post" />
        {open.openPost ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.openPost} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            {messageData.map(function(message){
                return (<ListItemButton>
                <Message message={message} key={message.id}/>
                </ListItemButton>);
            })}
        </List>
      </Collapse>

      <ListItemButton onClick={() => handleClick("openFollow")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
      <ListItemText primary="Follow" />
        {open.openFollow ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.openFollow} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            {messageData.map(function(message){
                return (<ListItemButton>
                <Message message={message} key={message.id}/>
                </ListItemButton>);
            })}
        </List>
      </Collapse>
      
      <ListItemButton onClick={() => handleClick("openLike")}>
        <ListItemIcon>
          <FavoriteIcon />
        </ListItemIcon>
      <ListItemText primary="Like" />
        {open.openLike ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.openLike} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            {messageData.map(function(message){
                return (<ListItemButton>
                <Message message={message} key={message.id}/>
                </ListItemButton>);
            })}
        </List>
      </Collapse>
      
      <ListItemButton onClick={() => handleClick("openComment")}>
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
      <ListItemText primary="Comment" />
        {open.openComment ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.openComment} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            {messageData.map(function(message){
                return (<ListItemButton>
                <Message message={message} key={message.id}/>
                </ListItemButton>);
            })}
        </List>
      </Collapse>

    </List>
    </div>
    </>
  );
}

export default Inbox;