import * as React from 'react';
import Message from '../Message/Message'; 
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

function MessageList({messageList}) { 
  return (
    <>
    {!messageList || messageList.length === 0 ? (
        <Message message={{"content":"No messages"}}/>
      ) : (
        <List component="div" disablePadding>
          {messageList.map(function (message) {
            return (
              <ListItemButton>
                <Message message={message} key={message.id} />
              </ListItemButton>
            );
          })}
        </List>
      )}
    </>
  );
}

export default MessageList;