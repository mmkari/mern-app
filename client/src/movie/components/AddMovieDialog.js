import * as React from 'react';
import AddMovieDialogForm from 'movie/components/AddMovieDialogForm';
import FormConfirmation from 'core/components/FormConfirmation';

import Add from '@material-ui/icons/Add';

const getInitialValues = () => ({
  title: '',
  fixed: true,
  date: null,
  tagOption: null,
});

const buttonContentRenderer = () => <Add />;

const AddMovieDialog = ({ onAccept, dialogContent }) => {
  const accept = (values) => {
    const { tagOption, ...rest } = values;
    const parsedValues = { ...rest, tags: [tagOption.value] };
    return onAccept(parsedValues);
  };

  return (
    <div>
      <FormConfirmation
        title={'Add movie'}
        contentRenderer={({ setValue, values }) => (
          <div>
            <AddMovieDialogForm onChange={setValue} values={values} />
          </div>
        )}
        buttonContentRenderer={buttonContentRenderer}
        getInitialValues={getInitialValues}
        onAccept={accept}
        stayOpen
      />
    </div>
  );
};

export default AddMovieDialog;
