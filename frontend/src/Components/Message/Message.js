import * as React from 'react';
import Typography from '@mui/material/Typography';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEnvelope} from '@fortawesome/free-solid-svg-icons'

import "./Message.css"; 

function Message({message}) { 

  return (
    <div className='message'>
      <Typography>
        {message.content}
      </Typography>
    </div>
  );
}

export default Message;