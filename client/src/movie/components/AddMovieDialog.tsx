import * as React from 'react';
import AddMovieDialogForm from 'movie/components/AddMovieDialogForm';
import FormConfirmation from 'core/components/FormConfirmation';

import Add from '@material-ui/icons/Add';

import {
  AddMovieDialogFormValues,
  AddMovieDialogFormValuesResponse,
} from 'movie/types';

const getInitialValues = (): AddMovieDialogFormValues => ({
  title: '',
  fixed: true,
  date: null,
  tagOption: null,
});

const buttonContentRenderer = () => <Add />;

type ContentRendererProps = {
  setValue: (name: string, value: any) => void;
  values: AddMovieDialogFormValues;
};
type AddMovieDialogProps = {
  onAccept: (values: object) => void;
  dialogContent: React.ReactNode | string;
};
const AddMovieDialog = ({ onAccept, dialogContent }: AddMovieDialogProps) => {
  const accept = (values: AddMovieDialogFormValuesResponse) => {
    const { tagOption, ...rest } = values;
    const parsedValues = { ...rest, tags: [tagOption.value] };
    return onAccept(parsedValues);
  };

  return (
    <div>
      <FormConfirmation
        title={'Add movie'}
        contentRenderer={({ setValue, values }: ContentRendererProps) => (
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
