import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ open, onClose, dialogData }) {
  const { username, steps } = dialogData;

  const handleNewGame = () => {
    onClose(true);
  };

  const handleExit = () => {
    onClose(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleExit}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Congratulations, ${username}!`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`You reached 100 in ${steps} steps! Would you like to start a new game or exit?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleExit} color="primary">
          Exit
        </Button>
        <Button onClick={handleNewGame} color="primary" autoFocus>
          New Game
        </Button>
      </DialogActions>
    </Dialog>
  );
}
