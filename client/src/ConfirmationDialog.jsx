import * as React from 'react';
import Dialog from './Dialog';
import Button from './input/Button';

import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Confirmation = ({
  title,
  onAccept,
  content,
  pristine,
  onClose,
  buttonContentRenderer,
  stayOpen,
}) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [snackOpen, setSnackOpen] = React.useState(false);

  function openDialog() {
    // resetForm()
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  }

  const accept = () => {
    setLoading(true);
    //
    window.setTimeout(() => {
      Promise.resolve(onAccept()).then(() => {
        setLoading(false);
        if (!stayOpen) {
          closeDialog();
        }
        setSnackOpen(true);
      });
    }, 1000);
  };

  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        type="minimal"
        onClick={openDialog}
      >
        {buttonContentRenderer()}
        {/* <Add /> */}
      </Button>
      <Dialog
        preventBackdropClose={!pristine}
        isOpen={open}
        closeDialog={closeDialog}
        title={title}
        dialogContent={content}
        dialogActions={
          <React.Fragment>
            <Button onClick={closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={accept} color="primary" disabled={pristine}>
              Accept
            </Button>
            {loading && <CircularProgress />}
          </React.Fragment>
        }
      />

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
      >
        <Alert onClose={closeSnackbar} severity="success">
          Success!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Confirmation;
