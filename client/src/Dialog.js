import * as React from 'react'
import './Dialog.css'

import MaterialDialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const Dialog = ({
  isOpen,
  closeDialog,
  title,
  dialogContent,
  dialogActions,
  preventBackdropClose
}) => {
  return (
    <MaterialDialog
      open={isOpen}
      onClose={closeDialog}
      disableBackdropClick={preventBackdropClose}
    >
      <DialogTitle style={{ 'user-select': 'none' }}>
        {title || 'Confirm Action'}
      </DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </MaterialDialog>
  )
}

export default Dialog
