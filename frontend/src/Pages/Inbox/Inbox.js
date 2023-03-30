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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';

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
  const ENDPOINT = app_url + '/service/authors/' + uuid + '/inbox'; 
  
  const [messageList, setMessageList] = useState([]);
  const [open, setOpen] = React.useState({
    openPost: false,
    openComment: false,
    openFollow: false,
    openLike: false,
  });

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

  useEffect(() => {
    fetch(ENDPOINT, {
      headers: { "Accept": "application/json", "Authorization": 'Basic ' + btoa('username1:123') },
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
      <ThemeProvider theme={ theme }>
        {/* <Box sx={{  bgcolor: "#E6EAF3", 
                    height: '100%', 
                    minHeight: '100vw' }}> */}
          <div className="inbox">
            <List sx={{ width: '100%', 
                        minWidth: 360, 
                        bgcolor: 'background.paper' }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                              <ListSubheader  component="div" 
                                              id="nested-list-subheader" 
                                              style={{fontSize:'20px', color:'#007DAA'}}>
                                  Message List 
                              </ListSubheader>
                            }>

            {messageList && <>

              {open.openPost ? 
                <Box>
                  <ListItemButton style={{  color: '#FFFFFF', 
                                            backgroundColor:'#FF694B', 
                                            borderRadius:'0px 0px 15px 15px'}} 
                                  onClick={() => handleClick("openPost")}>

                    <ListItemIcon style={{color: '#FFFFFF' }}>
                      <EmailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Post" />
                    <ExpandLess />
                  </ListItemButton >
                  <Collapse style={{marginLeft:'40px', 
                                    marginRight:'40px', 
                                    borderBottom:'1px dashed #007DAA', 
                                    color:'#007DAA'}} 
                            in={open.openPost} 
                            timeout="auto" 
                            unmountOnExit>
                    <MessageList  messageList={messageList[0]} 
                                  type={"post"}/>
                  </Collapse>
                </Box> :
                <ListItemButton style={{color:'#007DAA'}} 
                                onClick={() => handleClick("openPost")}>
                  <ListItemIcon >
                    <EmailIcon style={{color:'#007DAA'}}/>
                  </ListItemIcon>
                  <ListItemText primary="Post" />
                  <ExpandMore style={{color:'#FF694B'}}/>
                </ListItemButton>
              }
                
              

              {open.openComment ? 
                <Box>
                  <ListItemButton  style={{  color: '#FFFFFF', 
                                              backgroundColor:'#FF694B', 
                                              borderRadius:'0px 0px 15px 15px'}} 
                                    onClick={() => handleClick("openComment")}>
                    <ListItemIcon style={{color: '#FFFFFF'}}>
                      <ChatIcon />
                    </ListItemIcon>
                    <ListItemText primary="Comment" />
                    <ExpandLess />
                  </ListItemButton> 
                  <Collapse style={{  marginLeft:'40px', 
                                      marginRight:'40px', 
                                      borderBottom:'1px dashed #007DAA', 
                                      color:'#007DAA'}} 
                            in={open.openComment} 
                            timeout="auto" 
                            unmountOnExit>
                    <MessageList messageList={messageList[1]} 
                                type={"comment"}/>
                  </Collapse>
                </Box> :
                <ListItemButton style={{color:'#007DAA'}} 
                                onClick={() => handleClick("openComment")}>
                  <ListItemIcon>
                    <ChatIcon style={{color:'#007DAA'}}/>
                  </ListItemIcon>
                  <ListItemText primary="Comment" />
                  <ExpandMore style={{color:'#FF694B'}}/>
                </ListItemButton>
              }
                

              {open.openFollow ? 
                <Box>
                  <ListItemButton style={{  color: '#FFFFFF', 
                                            backgroundColor:'#FF694B', 
                                            borderRadius:'0px 0px 15px 15px'}} 
                                  onClick={() => handleClick("openFollow")}>
                    <ListItemIcon style={{color: '#FFFFFF'}}>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Follow" />
                    <ExpandLess />
                  </ListItemButton>
                  <Collapse style={{  marginLeft:'40px', 
                                      marginRight:'40px', 
                                      borderBottom:'1px dashed #007DAA', 
                                      color:'#007DAA'}} 
                            in={open.openFollow} 
                            timeout="auto" 
                            unmountOnExit>
                    <MessageList messageList={messageList[2]} 
                                 type={"follow"}/>
                  </Collapse>
                </Box> :
                <ListItemButton style={{color:'#007DAA'}} 
                                onClick={() => handleClick("openFollow")}>
                  <ListItemIcon>
                    <PeopleIcon style={{color:'#007DAA'}}/>
                  </ListItemIcon>
                  <ListItemText primary="Follow" />
                  <ExpandMore style={{color:'#FF694B'}}/>
                </ListItemButton>}
                
              {open.openLike ? 
                <Box>
                  <ListItemButton style={{  color: '#FFFFFF', 
                                            backgroundColor:'#FF694B', 
                                            borderRadius:'0px 0px 15px 15px'}} 
                                  onClick={() => handleClick("openLike")}>
                    <ListItemIcon style={{color: '#FFFFFF'}}>
                      <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Like" />
                    <ExpandLess /> 
                  </ListItemButton>
                  <Collapse style={{  marginLeft:'40px', 
                                    marginRight:'40px', 
                                    borderBottom:'1px dashed #007DAA', 
                                    color:'#007DAA'}} 
                          in={open.openLike} 
                          timeout="auto" 
                          unmountOnExit>
                    <MessageList messageList={messageList[3]} type={"like"} style={{}}/>
                  </Collapse>
                </Box> :
                <ListItemButton style={{color:'#007DAA'}} 
                                onClick={() => handleClick("openLike")}>
                  <ListItemIcon>
                    <FavoriteIcon style={{color:'#007DAA'}}/>
                  </ListItemIcon>
                  <ListItemText primary="Like" />
                  <ExpandMore style={{color:'#FF694B'}}/>
                </ListItemButton>
              }

      </>
      }
      
    </List>
    </div>
    {/* </Box> */}
    </ThemeProvider>
    </>
  );
}

export default Inbox;