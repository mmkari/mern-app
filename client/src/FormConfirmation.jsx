import * as React from 'react'
import ConfirmationDialog from './ConfirmationDialog'

// Shows a form inside a dialog
const FormConfirmation = ({
  getInitialValues,
  onAccept,
  title,
  contentRenderer,
  buttonContentRenderer,
  stayOpen
}) => {
  const [values, setValues] = React.useState(getInitialValues())
  const [pristine, setPristine] = React.useState(true)

  const setValue = (name, value) => {
    if (pristine) {
      setPristine(false)
    }

    setValues({ ...values, [name]: value })
  }

  const resetForm = () => {
    setValues(getInitialValues())
    setPristine(true)
  }

  const onClose = () => {
    resetForm()
  }

  const accept = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })
      .then(() => onAccept(values))
      .then(() => {
        resetForm()
      })
      .catch(() => {})
  }

  const content = contentRenderer({ setValue, values })

  return (
    <div>
      <ConfirmationDialog
        title={title}
        content={content}
        pristine={pristine}
        onAccept={accept}
        onClose={onClose}
        buttonContentRenderer={buttonContentRenderer}
        stayOpen={stayOpen}
      />
    </div>
  )
}

export default FormConfirmation
