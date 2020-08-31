import * as React from 'react';
import { connect } from 'react-redux';
import TextInput from 'input/TextInput';
import Button from 'input/Button';
import classnames from 'classnames';

import {
  postTagRequest,
  getTagsRequest,
  deleteTagRequest,
  patchTagRequest,
} from 'tag/actions';

import { getTags } from 'tag/selectors';

import styled, { css } from 'styled-components';

import DeleteConfirmationDialog from 'core/components/DeleteConfirmationDialog';

import Add from '@material-ui/icons/Add';
import Clear from '@material-ui/icons/Clear';
import Done from '@material-ui/icons/Done';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import Edit from '@material-ui/icons/Edit';

const InputContainer = styled.div`
  display: flex;
  label {
    width: 50%;
  }
`;
const TagForm = ({ values, onChange, className }) => {
  return (
    <div className={className}>
      <InputContainer>
        <label>Name:</label>
        <TextInput
          value={values ? values.name : ''}
          onChange={(val) => onChange('name', val)}
        />
      </InputContainer>

      <InputContainer>
        <label>Value:</label>
        <TextInput
          value={values ? values.value : ''}
          onChange={(val) => onChange('value', val)}
        />
      </InputContainer>
    </div>
  );
};
const StyledTagForm = styled(TagForm)`
  // display: flex;
  // align-items: center;
  border: 1px dashed red;
`;

const getInitialValues = () => ({
  name: '',
  value: '',
});

const MainContainer = styled.div`
  background: white;
  z-index: 3;
  display: flex;
  align-items: center;
  border: 1px solid gray;

  margin-top: 1em;
`;

const commonConnectorStyles = css`
  z-index: -1;
  position: absolute;
  content: ' ';
`;

const borderWidth = '1.5px';
const offsetLeft = '-30px';
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
const formOffsetLeft = '18px';
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

const connectorPaddingLeft = '48px';
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

const FormContainer = styled.div`
  padding-left: ${connectorPaddingLeft};
  padding-bottom: 1em;
  // flex-direction: column;
  // background: lightblue;

  ${connectorStyles};
`;
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

const Form = ({ onAccept, onCancel, values: initialValues }) => {
  const [values, setValues] = React.useState(
    initialValues || getInitialValues()
  );
  // const [pristine, setPristine] = React.useState(true);

  const setValue = (name, value) => {
    // if (pristine) {
    //   setPristine(false);
    // }

    setValues({ ...values, [name]: value });
  };

  const submit = () => {
    onAccept(values);
  };

  return (
    <div className="Form">
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

const TagItem = ({ tag, deleteTag, addTag, updateTag, className }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [expandedEdit, setExpandedEdit] = React.useState(false);
  // const [values, setValues] = React.useState(getInitialValues());
  // const [pristine, setPristine] = React.useState(true);

  // React.useEffect(() => {
  //   if (!expanded) {
  //     resetForm(); // reset after form closed
  //   }
  // }, [expanded]);

  const expand = () => {
    setExpanded(true);
  };
  const expandEdit = () => {
    setExpandedEdit(true);
  };
  // const resetForm = () => {
  //   setValues(getInitialValues());
  // };
  const cancel = () => {
    setExpanded(false);
  };
  const cancelEdit = () => {
    setExpandedEdit(false);
  };

  // const accept = () => {
  //   const parentId = tag ? tag.id : undefined;
  //   addTag({ ...values, parentId }).then(() => {
  //     setExpanded(false);
  //   });
  // };
  const onAccept = (vals) => {
    const parentId = tag ? tag.id : undefined;
    addTag({ ...vals, parentId }).then(() => {
      setExpanded(false);
    });
  };
  const onAcceptEdit = (vals) => {
    updateTag(tag.id, vals).then(() => {
      setExpandedEdit(false);
    });
  };

  // const setValue = (name, value) => {
  //   if (pristine) {
  //     setPristine(false);
  //   }

  //   setValues({ ...values, [name]: value });
  // };

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
                  deleteTag(tag.id);
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
            <TagItem tag={childTag} deleteTag={deleteTag} addTag={addTag} />
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
                {/* <Button onClick={cancel} type="minimal">
                  <Clear />
                </Button>
                <Button onClick={accept} type="minimal">
                  <Done />
                </Button>
                <StyledTagForm values={values} onChange={setValue} /> */}
              </>
            )}
          </ButtonsContainer>
        </FormContainerContent>
      </FormContainer>
    </TagItemContainer>
  );
};

const ChildrenContainer = styled.div`
  // border: 1px solid black;
  padding-left: 3em;

  ${connectorStylesChildren};
`;

const connectorStylesLeft = css`
  &::after {
    ${commonConnectorStyles}

    height: 100%;
    width: 20px;
    border-left: ${borderWidth} solid blue;
    // border-bottom: ${borderWidth} solid blue;
    left: ${formOffsetLeft};
    // bottom: 10px;
    top: 0;
  }

`;

const TagList = styled.ul`
  padding-left: ${connectorPaddingLeft};

  position: relative;
  list-style: none;

  ${connectorStylesLeft};
`;

const DashedButton = styled(Button)`
  border: 1px dashed black;
  padding: 1em 2em;
  width: 100%;
  margin-bottom: 1em;
`;

const TagPage = (props) => {
  React.useEffect(() => {
    props.getTagsRequest();
  }, []);

  const submit = () => {
    props.postTagRequest({});
  };

  const { tags } = props;

  // const expand = (id) => {};

  if (tags) {
  }

  const deleteFun = (id) => {
    return props.deleteTag(id);
  };

  return (
    <div className="TagPage">
      <h1>TAGS</h1>
      {/* <DashedButton onClick={undefined}>ADD2</DashedButton> */}
      {tags && (
        <TagList>
          {tags.map((tag) => (
            <TagItem
              key={`tag-${tag.id}`}
              tag={tag}
              deleteTag={deleteFun}
              addTag={props.postTagRequest}
              updateTag={props.patchTagRequest}
            />
          ))}
        </TagList>
      )}
      <TagItem
        className="RootTagItem"
        style={{ paddingLeft: connectorPaddingLeft }}
        tag={null}
        deleteTag={null}
        addTag={props.postTagRequest}
      />
    </div>
  );
};
const mapStateToProps = (state) => ({
  tags: getTags(state),
});
const mapDispatchToProps = (dispatch) => ({
  postTagRequest: (data) => dispatch(postTagRequest(data)),
  patchTagRequest: (id, data) => dispatch(patchTagRequest(id, data)),
  getTagsRequest: () => dispatch(getTagsRequest()),
  deleteTag: (id) => dispatch(deleteTagRequest(id)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagPage);

const Settings = () => {
  return <div>Add tag management..</div>;
};
// export default Settings
// export default TagPage
