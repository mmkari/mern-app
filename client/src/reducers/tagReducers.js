/* eslint-disable no-fallthrough */
import {
  GET_TAGS_SUCCESS,
  GET_TAG_SUCCESS,
  DELETE_TAG_SUCCESS,
  POST_TAG_SUCCESS,
  PATCH_TAG_SUCCESS,
} from '../tag/actions';

import produce from 'immer';

const initialState = {
  // activeMovieId: null,
  tagsById: {},
};

export default (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_TAGS_SUCCESS:
        action.payload.forEach((tag) => {
          if (tag._id) {
            draft.tagsById[tag._id] = {
              id: tag._id,
              parentId: tag.parentId,
              name: tag.name,
              value: tag.value,
            };
          }
        });
        return;
      case GET_TAG_SUCCESS:
        const tag = action.payload;
        draft.tagsById[tag._id] = {
          id: tag._id,
          parentId: tag.parentId,
          name: tag.name,
          value: tag.value,
        };
        return;
      case DELETE_TAG_SUCCESS: {
        const { [action.payload.id]: deleted, ...rest } = draft.tagsById;
        draft.tagsById = rest;
        return;
      }
      case POST_TAG_SUCCESS: {
        if (action.payload.data) {
          const tag = action.payload.data;
          draft.tagsById[tag._id] = {
            id: tag._id,
            parentId: tag.parentId,
            name: tag.name,
            value: tag.value,
          };
        }
        return;
      }
      case PATCH_TAG_SUCCESS: {
        draft.tagsById[action.payload.id] = {
          id: action.payload.id,
          ...draft.tagsById[action.payload.id],
          ...action.payload.data,
        };
      }
    }
  });
