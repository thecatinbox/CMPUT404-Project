import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import "./User.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

function User({user}) { 

  return (
    <div className='user'>
      <Card sx={{ minWidth: 275 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ alignSelf: 'flex-start' }}>
          {user.displayName}
        </Typography>
        <Typography sx={{ alignSelf: 'flex-end' }}>
          <Button>
            <FontAwesomeIcon icon={faUserPlus} />
          </Button>
        </Typography>
      </CardContent>
      </Card>
    </div>
  );
}

export default User;