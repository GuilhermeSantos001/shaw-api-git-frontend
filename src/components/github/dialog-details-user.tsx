import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

declare interface Props {
  open: boolean;
  username: string;
  handleClose: () => void;
  handleSelectUser: () => void;
}

export function DialogDetailsUser({
  open,
  username,
  handleClose,
  handleSelectUser,
}: Props) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="github-dialog-details-user-description"
    >
      <DialogTitle>
        User({username}) details
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="github-dialog-details-user-description">
          Want to know more about {username}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{color: "black", ":hover": { color: "dimgray" }}}>
          Cancel
          </Button>
        <Button onClick={handleSelectUser} sx={{color: "black", ":hover": { color: "dimgray" }}}>
        Show Details
        </Button>
      </DialogActions>
    </Dialog>
  );
}
