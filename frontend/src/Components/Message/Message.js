import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope} from '@fortawesome/free-solid-svg-icons'

import "./Message.css"; 

function Message({message}) { 

  return (
    <div className='message'>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography>
            <FontAwesomeIcon icon={faEnvelope} /> {message.content}
          </Typography>
        </CardContent>

      </Card>
    </div>
  );
}

export default Message;