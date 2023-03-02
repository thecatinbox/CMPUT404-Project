import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import "./Message.css"; 

function Message({message}) { 

  return (
    <div className='message'>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography>
            {message.content}
          </Typography>
        </CardContent>

      </Card>
    </div>
  );
}

export default Message;