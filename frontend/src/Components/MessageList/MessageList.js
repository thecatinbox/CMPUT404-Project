import * as React from 'react';
import Message from '../Message/Message'; 
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

import { useEffect, useState } from 'react';

function MessageList({ messageList }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (messageList && messageList.length > 0) {
      setMessages(messageList);
    } else {
      setMessages([{ id: '1', type: 'No messages' }]);
    }
  }, [messageList]);

  // console.log(messages); 

  return (
    <>
    {!messageList || messageList.length === 0 ? (
        <Message message={{"type":"No messages"}}/>
      ) : (
        <List component="div" disablePadding>
          {messages.map(function(message){ 
            return (
            <Message message={message} />
            )
          })}
        </List>
      )}
    </>
  );
}

export default MessageList;