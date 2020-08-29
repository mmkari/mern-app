import * as React from 'react';
import ConfirmationDialog from 'core/components/ConfirmationDialog';

import Delete from '@material-ui/icons/Delete';

const buttonContentRenderer = () => <Delete />;

const DeleteConfirmationButton = ({ onAccept }) => {
  const [error, setError] = React.useState(false);

  const accept = () => {
    setError(false);
    if (onAccept) {
      onAccept();
    }
  };

  return (
    <div>
      <ConfirmationDialog
        title={'Delete item'}
        content={
          <div>
            <p>This will delete the item</p>
            {error && <p style={{ color: 'red' }}>Deleting item failed</p>}
          </div>
        }
        onAccept={accept}
        buttonContentRenderer={buttonContentRenderer}
      />
    </div>
  );
};

export default DeleteConfirmationButton;
