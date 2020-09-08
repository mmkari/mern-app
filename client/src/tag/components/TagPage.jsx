import * as React from 'react';
import { connect } from 'react-redux';

import {
  postTagRequest,
  getTagsRequest,
  deleteTagRequest,
  patchTagRequest,
} from 'tag/actions';

import { getTags } from 'tag/selectors';

import styled, { css } from 'styled-components';

import TagItem, {
  commonConnectorStyles,
  borderWidth,
  formOffsetLeft,
  connectorPaddingLeft,
} from 'tag/components/TagItem';

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
