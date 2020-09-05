import * as React from 'react';
import { connect } from 'react-redux';
import Tag from './Tag';
import styled from 'styled-components';
import classnames from 'classnames';

import { getTagsRequest } from 'tag/actions';

import { getTags, getTagsById } from 'tag/selectors';
import { TagsByIdMap } from 'tag/types';

type MapDispatchToProps = {
  getTagsRequest: () => void;
};
type MapStateToProps = {
  tagsById: TagsByIdMap;
};
type ReduxProps = MapDispatchToProps & MapStateToProps;
type TagDisplayProps = {
  value: number;
  className?: string;
} & ReduxProps;
// reads all tags from store, props can define list of nodes to include as options
class TagDisplay extends React.Component<TagDisplayProps> {
  componentDidMount = () => {
    // TODO only make sure selected tags exist in store
    this.props.getTagsRequest();
  };

  render() {
    const { tagsById, value, className } = this.props;

    // if (!tags) {
    //     // ...
    // }

    const selected = (value ? [value] : [])
      .map((tagId) => tagsById[tagId])
      .filter((t) => !!t);

    return (
      <div className={classnames('TagDisplay', className)}>
        {selected.map((t) => (
          <Tag value={t.name} />
        ))}
      </div>
    );
  }
}

const StyledTagDisplay = styled(TagDisplay)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const mapStateToProps = (state) => ({
  tagsById: getTagsById(state),
});
const mapDispatchToProps = (dispatch) => ({
  //   postTagRequest: (data) => dispatch(postTagRequest(data)),
  getTagsRequest: () => dispatch(getTagsRequest()),
  //   deleteTag: (id) => dispatch(deleteTagRequest(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledTagDisplay);
