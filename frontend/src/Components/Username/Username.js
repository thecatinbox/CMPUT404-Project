import * as React from 'react';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import User from "../User/User";

function Username({user}) { 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Link href="#" variant="outlined" onClick={handleClickOpen}>
        {user.displayName}
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Follow user"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <User user={user}/>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default Username;