import * as React from 'react';
import { connect } from 'react-redux';
import SelectInput from '../../input/SelectInput';

import { getTagsRequest } from '../actions';

import { getTags } from '../selectors';
import styled from 'styled-components';

import { Tag } from 'tag/types';
import { SelectOption } from 'input/types';
import { RootState, ThunkDispatch } from 'core/types';

const TagSelectContainer = styled.div``;

type MapStateToProps = {
  tags: Tag[] | null;
};
type MapDispatchToProps = {
  getTagsRequest: () => Promise<any>;
};
type TagSelectProps = MapStateToProps &
  MapDispatchToProps & {
    value: any;
    onChange: (value: { value: string; label: string }) => void;
    style?: any;
  };
type TagSelectState = {};
// reads all tags from store, props can define list of nodes to include as options
class TagSelect extends React.Component<TagSelectProps, TagSelectState> {
  componentDidMount = () => {
    this.props.getTagsRequest();
  };

  onChange = (selectedOption: SelectOption) => {
    const { onChange } = this.props;
    // const value = event.target.value
    // const value = selectedOption.value
    if (onChange) {
      onChange(selectedOption);
    }
  };

  render() {
    const { tags, value } = this.props;

    // if (!tags) {
    //     // ...
    // }

    const options = (tags || []).map((tag) => ({
      value: tag.id,
      label: tag.name,
    }));

    return (
      <TagSelectContainer>
        <SelectInput value={value} onChange={this.onChange} options={options} />
      </TagSelectContainer>
    );
  }
}

const mapStateToProps = (state: RootState): MapStateToProps => ({
  tags: getTags(state),
});
const mapDispatchToProps = (dispatch: ThunkDispatch): MapDispatchToProps => ({
  //   postTagRequest: (data) => dispatch(postTagRequest(data)),
  getTagsRequest: () => dispatch(getTagsRequest()),
  //   deleteTag: (id) => dispatch(deleteTagRequest(id)),
});

// export default TagSelect
export default connect(mapStateToProps, mapDispatchToProps)(TagSelect);
