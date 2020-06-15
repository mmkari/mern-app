import apiRequest from '../api.js';

export const GET_TAGS_SUCCESS = 'actions/GET_TAGS_SUCCESS';
export const DELETE_TAG_SUCCESS = 'actions/DELETE_TAG_SUCCESS';
export const POST_TAG_SUCCESS = 'actions/POST_TAG_SUCCESS';
export const PATCH_TAG_SUCCESS = 'actions/PATCH_TAG_SUCCESS';

export const GET_TAG_SUCCESS = 'actions/GET_TAG_SUCCESS';

export const getTagsSuccess = (data) => {
  return {
    type: GET_TAGS_SUCCESS,
    payload: data,
  };
};

export const getTagSuccess = (data) => {
  return {
    type: GET_TAG_SUCCESS,
    payload: data,
  };
};

export const deleteTagSuccess = (id) => {
  return {
    type: DELETE_TAG_SUCCESS,
    payload: { id },
  };
};

export const postTagSuccess = (data) => {
  return {
    type: POST_TAG_SUCCESS,
    payload: { data },
  };
};

export const patchTagSuccess = (id, data) => {
  return {
    type: PATCH_TAG_SUCCESS,
    payload: { id, data },
  };
};

export const getTagRequest = (id) => (dispatch) =>
  apiRequest(`tags/tags/${id}`)
    .then((res) => {
      dispatch(getTagSuccess(res));
      return res;
    })
    .catch();

export const getTagsRequest = () => (dispatch) =>
  apiRequest('tags/tags')
    .then((res) => dispatch(getTagsSuccess(res)))
    .catch();

export const postTagRequest = (data) => (dispatch) =>
  apiRequest(`tags/tags`, {
    method: 'post',
    data: data,
  })
    .then((res) => {
      dispatch(postTagSuccess(res));
    })
    .catch();

export const patchTagRequest = (id, data) => (dispatch) =>
  apiRequest(`tags/tags/${id}`, {
    method: 'patch',
    data: data,
  })
    .then((res) => {
      dispatch(patchTagSuccess(id, res));
    })
    .catch();

export const deleteTagRequest = (id) => (dispatch) =>
  apiRequest(`tags/tags/${id}`, { method: 'delete' })
    .then(() => dispatch(deleteTagSuccess(id)))
    .catch();
