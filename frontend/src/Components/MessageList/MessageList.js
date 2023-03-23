import * as React from 'react';
import Message from '../Message/Message'; 
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

function MessageList({messageList, type}) { 
  return (
    <>
    {!messageList || messageList.length === 0 ? (
        <Message message={{"content":"No messages"}}/>
      ) : (
        <List component="div" disablePadding>
          {messageList.map(function (message) {
            let Component;
            switch (type) {
              case "follow":
                return (
                  <ListItemButton key={message.id}>
                    <Message message={message} />
                  </ListItemButton>
                );

              default:
                return (
                  <ListItemButton key={message.id}>
                    <Message message={message} />
                  </ListItemButton>
                );
            }
            
          })}
        </List>
      )}
    </>
  );
}

export default MessageList;