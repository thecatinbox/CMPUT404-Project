import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import "./User.css"; 

function User({user}) { 

  return (
    <div className='user'>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography>
            {user.diaplayName}
          </Typography>
        </CardContent>

      </Card>
    </div>
  );
}

export default User;