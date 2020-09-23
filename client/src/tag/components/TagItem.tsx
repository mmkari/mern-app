import * as React from 'react';
import styled, { css } from 'styled-components';
import Button from 'input/Button';
import DeleteConfirmationDialog from 'core/components/DeleteConfirmationDialog';
import classnames from 'classnames';
import { TextInput } from 'input/TextInput';

import Add from '@material-ui/icons/Add';
import Clear from '@material-ui/icons/Clear';
import Done from '@material-ui/icons/Done';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import Edit from '@material-ui/icons/Edit';

import { Tag, TagNode } from 'tag/types';

export const borderWidth = '1.5px';
export const formOffsetLeft = '18px';
export const connectorPaddingLeft = '48px';

const offsetLeft = '-30px';

export const commonConnectorStyles = css`
  z-index: -1;
  position: absolute;
  content: ' ';
`;
const connectorStylesChildren = css`
  &::after {
    ${commonConnectorStyles}

    height: 100%;
    width: 30px;
    border-left: ${borderWidth} solid lightgreen;
    // border-bottom: ${borderWidth} solid orange;
    left: ${formOffsetLeft};
    bottom: 25px;
  }
`;
const connectorStyles = css`
  &::after {
    ${commonConnectorStyles}

    height: 72px;
    width: 30px;
    border-left: ${borderWidth} solid orange;
    border-bottom: ${borderWidth} solid orange;
    left: ${formOffsetLeft};
    bottom: 25px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  label {
    width: 50%;
  }
`;

type FormValues = {
  name: string;
  value: string;
};
type TagFormProps = {
  values: FormValues;
  onChange: (name: string, value: string) => void;
  className?: string;
};
const TagForm = ({ values, onChange, className }: TagFormProps) => {
  return (
    <div className={className}>
      <InputContainer>
        <label>Name:</label>
        <TextInput
          value={values ? values.name : ''}
          onChange={(val: string) => onChange('name', val)}
        />
      </InputContainer>

      <InputContainer>
        <label>Value:</label>
        <TextInput
          value={values ? values.value : ''}
          onChange={(val: string) => onChange('value', val)}
        />
      </InputContainer>
    </div>
  );
};

const getInitialValues = () => ({
  name: '',
  value: '',
});

type BaseFormProps = {
  onAccept: (v: FormValues) => void;
  onCancel: () => void;
  values?: FormValues;
  className?: string;
};
const BaseForm = ({
  onAccept,
  onCancel,
  values: initialValues,
  className,
}: BaseFormProps) => {
  const [values, setValues] = React.useState(
    initialValues || getInitialValues()
  );
  // const [pristine, setPristine] = React.useState(true);

  const setValue = (name: string, value: any) => {
    // if (pristine) {
    //   setPristine(false);
    // }

    setValues({ ...values, [name]: value });
  };

  const submit = () => {
    onAccept(values);
  };

  return (
    <div className={classnames('Form', className)}>
      <StyledTagForm values={values} onChange={setValue} />
      <Button onClick={onCancel} type="minimal">
        <Clear />
      </Button>
      <Button onClick={submit} type="minimal">
        <Done />
      </Button>
    </div>
  );
};

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  // background: green;
  &.grow {
    flex-grow: 1;
  }

  .grow {
    display: block;
    width: 100%;
    // flex-grow: 1;
  }
`;

const Form = styled(BaseForm)`
  display: flex;
`;
const TagItemContainer = styled.li`
  list-style: none;
  position: relative;

  &::after {
    ${commonConnectorStyles}

    height: 60px;
    width: 30px;
    border-left: ${borderWidth} solid black;
    border-bottom: ${borderWidth} solid black;
    left: ${offsetLeft};
    top: -24px;
  }
`;
const MainContainer = styled.div`
  background: white;
  z-index: 3;
  display: flex;
  align-items: center;
  border: 1px solid gray;

  margin-top: 1em;
`;

const NameValueBlocks = styled.div`
  display: flex;
  flex-direction: column;
`;
const NameValueContainer = styled.div`
  display: flex;
  // flex-direction: column;
  h4 {
    margin: 0;
  }
  div {
    height: 25px;
  }
`;
const ChildrenContainer = styled.div`
  padding-left: 3em;

  ${connectorStylesChildren};
`;
const FormContainer = styled.div`
  padding-left: ${connectorPaddingLeft};
  padding-bottom: 1em;
  // flex-direction: column;
  // background: lightblue;

  ${connectorStyles};
`;
const FormContainerContent = styled.div`
  background: white;
  border: 1px dashed lightgray;
  display: flex;

  &:hover,
  &.expanded {
    border: 1px dashed red;
  }
  transition: border-color 0.2s;
`;
const StyledTagForm = styled(TagForm)`
  // display: flex;
  // align-items: center;
  // border: 1px dashed red;
`;

type TagItemProps = {
  tag: TagNode | null;
  deleteTag?: (id: string) => Promise<any>;
  addTag: (o: { [key: string]: any }) => Promise<any>;
  updateTag?: (id: string, v: FormValues) => Promise<any>;
  className?: string;
  style?: any;
};
const TagItem = ({
  tag,
  deleteTag,
  addTag,
  updateTag,
  className,
}: TagItemProps) => {
  const [expanded, setExpanded] = React.useState(false);
  const [expandedEdit, setExpandedEdit] = React.useState(false);

  const expand = () => {
    setExpanded(true);
  };
  const expandEdit = () => {
    setExpandedEdit(true);
  };
  const cancel = () => {
    setExpanded(false);
  };
  const cancelEdit = () => {
    setExpandedEdit(false);
  };

  const onAccept = (vals: FormValues) => {
    const parentId = tag ? tag.id : undefined;
    addTag({ ...vals, parentId }).then(() => {
      setExpanded(false);
    });
  };
  const onAcceptEdit = (vals: FormValues) => {
    if (tag && updateTag) {
      updateTag(tag.id, vals).then(() => {
        setExpandedEdit(false);
      });
    }
  };

  return (
    <TagItemContainer className={className}>
      {tag && (
        <MainContainer className="MainContainer">
          {expandedEdit ? (
            <Form onCancel={cancelEdit} onAccept={onAcceptEdit} values={tag} />
          ) : (
            <>
              <NameValueBlocks>
                <NameValueContainer>
                  <h4>Name:</h4>
                  <div>{tag.name}</div>
                </NameValueContainer>
                <NameValueContainer>
                  <h4>Value:</h4>
                  <div>{tag.value}</div>
                </NameValueContainer>
              </NameValueBlocks>
              <DeleteConfirmationDialog
                onAccept={() => {
                  if (deleteTag) {
                    deleteTag(tag.id);
                  }
                }}
              />
              <Button onClick={expandEdit} type="minimal">
                <Edit />
              </Button>
            </>
          )}
        </MainContainer>
      )}
      {/* list children here recursively */}
      {tag && (tag.children || []).length > 0 && (
        <ChildrenContainer className="ChildrenContainer">
          {(tag.children || []).map((childTag) => (
            <TagItem
              key={`tag-${childTag.id}`}
              tag={childTag}
              deleteTag={deleteTag}
              addTag={addTag}
              updateTag={updateTag}
            />
          ))}
        </ChildrenContainer>
      )}
      {/* show buttons and add form */}
      <FormContainer className="FormContainer">
        <FormContainerContent
          className={classnames('FormContainerContent', { expanded })}
        >
          <ButtonsContainer
            className={classnames('ButtonsContainer', { grow: !expanded })}
          >
            {!expanded && (
              <Button className="grow" onClick={expand} type="minimal">
                {/* <SubdirectoryArrowRightIcon /> */}
                <Add />
              </Button>
            )}
            {expanded && (
              <>
                <Form onCancel={cancel} onAccept={onAccept} />
              </>
            )}
          </ButtonsContainer>
        </FormContainerContent>
      </FormContainer>
    </TagItemContainer>
  );
};

export default TagItem;
