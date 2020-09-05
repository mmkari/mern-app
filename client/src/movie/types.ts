import * as React from 'react';

export const GET_MOVIES_SUCCESS = 'actions/GET_MOVIES_SUCCESS';
export const DELETE_MOVIE_SUCCESS = 'actions/DELETE_MOVIE_SUCCESS';
export const POST_MOVIE_SUCCESS = 'actions/POST_MOVIE_SUCCESS';
export const PATCH_MOVIE_SUCCESS = 'actions/PATCH_MOVIE_SUCCESS';
export const SET_ACTIVE_MOVIE = 'actions/SET_ACTIVE_MOVIE';
// export const SET_FILTERED_IDS = 'actions/SET_FILTERED_IDS'; // decouple
export const GET_MOVIE_SUCCESS = 'actions/GET_MOVIE_SUCCESS';

type AddMovieDialogFormBase = {
  title: string;
  fixed: boolean;
  date: null;
};
export type AddMovieDialogFormValues = AddMovieDialogFormBase & {
  tagOption: Object | null;
};

export type AddMovieDialogFormValuesResponse = AddMovieDialogFormBase & {
  tagOption: { value: string; label: string };
};

export type Movie = {
  id: string;
  title: string;
  fixed: boolean;
  averageRating: number;
  tags: Object[];
};
export type MovieApiResponse = {
  _id: string;
  title: string;
  fixed: boolean;
  averageRating: number;
  tags: Object[];
};

export type SetActiveMovieAction = {
  type: typeof SET_ACTIVE_MOVIE;
  payload: string;
};

export type GetMoviesSuccessAction = {
  type: typeof GET_MOVIES_SUCCESS;
  payload: MovieApiResponse[];
  query: Object;
};

export type GetMovieSuccessAction = {
  type: typeof GET_MOVIE_SUCCESS;
  payload: MovieApiResponse;
};

export type DeleteMovieSuccessAction = {
  type: typeof DELETE_MOVIE_SUCCESS;
  payload: { id?: string; [propName: string]: string };
};

export type PostMovieSuccessAction = {
  type: typeof POST_MOVIE_SUCCESS;
  payload: { data: Object };
};

export type PatchMovieSuccessAction = {
  type: typeof PATCH_MOVIE_SUCCESS;
  payload: { id: string; data: Object };
};

export type MovieActionType =
  | SetActiveMovieAction
  | GetMoviesSuccessAction
  | GetMovieSuccessAction
  | DeleteMovieSuccessAction
  | PostMovieSuccessAction
  | PatchMovieSuccessAction;
