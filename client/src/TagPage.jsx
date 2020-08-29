import * as React from 'react';
import { connect } from 'react-redux';
import TextInput from './input/TextInput';
import Button from './input/Button';

import {
  postTagRequest,
  getTagsRequest,
  deleteTagRequest,
} from './tag/actions';

import { getTags } from './tag/selectors';

import styled, { keyframes } from 'styled-components';

import DeleteConfirmationDialog from './DeleteConfirmationDialog';

import Add from '@material-ui/icons/Add';
import Clear from '@material-ui/icons/Clear';
import Done from '@material-ui/icons/Done';
import Edit from '@material-ui/icons/Edit';

const TagForm = ({ values, onChange }) => {
  return (
    <div>
      <TextInput
        value={values ? values.name : ''}
        label="Name: "
        onChange={(val) => onChange('name', val)}
      />

      <TextInput
        value={values ? values.value : ''}
        label="Value: "
        onChange={(val) => onChange('value', val)}
      />
    </div>
  );
};

const getInitialValues = () => ({
  name: '',
  value: '',
});

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px dashed red;

  // h2 {
  //   margin-right: 50%;
  // }
`;

const borderWidth = '1.5px';
const offsetLeft = '-30px';
const TagItemContainer = styled.li`
  // height: 70px;
  // display: flex;
  // align-items: center;
  // justify-content: space-around;


  position: relative;

  &::after {
    position: absolute;
    height: 60px;
    width: 20px;
    border-left: ${borderWidth} solid black;
    border-bottom: ${borderWidth} solid black;
    content: ' ';
    left: ${offsetLeft};
    top: -24px;
  }

  &:not(:last-of-type)::before {
    position: absolute;
    height: 100%;
    width: 20px;
    border-left: ${borderWidth} solid black;
    // border-bottom: ${borderWidth} solid black;
    content: ' ';
    left: ${offsetLeft};
    top: -24px;
  }
`;

const NameValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  h4 {
    margin: 0;
  }
  div {
    height: 25px;
  }
`;

const TagItem = ({ tag, deleteTag, addTag }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [values, setValues] = React.useState(getInitialValues());
  const [pristine, setPristine] = React.useState(true);

  React.useEffect(() => {
    if (!expanded) {
      resetForm(); // reset after form closed
    }
  }, [expanded]);

  const expand = () => {
    setExpanded(true);
  };
  const resetForm = () => {
    setValues(getInitialValues());
  };
  const cancel = () => {
    setExpanded(false);
  };
  const accept = () => {
    addTag({ ...values, parentId: tag.id }).then(() => {
      setExpanded(false);
    });
  };

  const setValue = (name, value) => {
    if (pristine) {
      setPristine(false);
    }

    setValues({ ...values, [name]: value });
  };

  return (
    <TagItemContainer>
      <MainContainer>
        <NameValueContainer>
          <h4>Name:</h4>
          <div>{tag.name}</div>
        </NameValueContainer>
        <NameValueContainer>
          <h4>Value:</h4>
          <div>{tag.value}</div>
        </NameValueContainer>
        <DeleteConfirmationDialog
          onAccept={() => {
            deleteTag(tag.id);
          }}
        />
      </MainContainer>
      {!expanded && (
        <Button onClick={expand} type="minimal">
          <Add />
        </Button>
      )}
      {expanded && (
        <>
          <Button onClick={cancel} type="minimal">
            <Clear />
          </Button>
          <Button onClick={accept} type="minimal">
            <Done />
          </Button>
        </>
      )}
      {expanded && <TagForm values={values} onChange={setValue} />}

      {/* list children here recursively */}
      {(tag.children || []).length > 0 && (
        <ChildrenContainer>
          {(tag.children || []).map((childTag) => (
            <TagItem tag={childTag} deleteTag={deleteTag} addTag={addTag} />
          ))}
        </ChildrenContainer>
      )}
    </TagItemContainer>
  );
};

const ChildrenContainer = styled.div`
  // border: 1px solid black;
  padding-left: 3em;
`;

const TagList = styled.ul`
  position: relative;
  list-style: none;
  // &::after {
  //   // border: 3px solid blue;
  //   position: absolute;
  //   top: -3px;
  //   background: green;
  //   width: 3px;
  //   height: 100%;
  //   content: ' ';
  //   left: 10px;
  // }
`;

const TagPage = (props) => {
  React.useEffect(() => {
    props.getTagsRequest();
  }, []);

  const submit = () => {
    props.postTagRequest({});
  };

  const { tags } = props;

  const expand = (id) => {};

  if (tags) {
  }

  const deleteFun = (id) => {
    return props.deleteTag(id);
  };

  return (
    <div>
      <h1>TAGS</h1>
      <button onClick={submit}>ADD</button>
      {tags && (
        <TagList>
          {tags.map((tag) => (
            <TagItem
              tag={tag}
              deleteTag={deleteFun}
              addTag={props.postTagRequest}
            />
          ))}
        </TagList>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  tags: getTags(state),
});
const mapDispatchToProps = (dispatch) => ({
  postTagRequest: (data) => dispatch(postTagRequest(data)),
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
