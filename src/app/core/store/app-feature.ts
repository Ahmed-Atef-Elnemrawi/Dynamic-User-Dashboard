import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../models';
import { appActions } from './app-actions';

/**
 * Interface defining the state structure for user search functionality.
 */
export interface State {
  searchTerm: number | string;
  searchResult: User[];
  error: string;
}

/**
 * Defines the initial state for the user search feature.
 */
const initialState: State = {
  searchResult: [],
  error: '',
  searchTerm: '',
};

/**
 * Feature definition for user search using `createFeature` from ngrx/store.
 */
export const appFeature = createFeature({
  name: 'app',
  reducer: createReducer(
    initialState,
    on(appActions.searchUser, (state, action) => ({
      ...state,
      searchTerm: action.id,
      error: '',
    })),

    on(appActions.searchUserSuccess, (state, action) => ({
      ...state,
      searchResult: action.users,
      error: '',
    })),

    on(appActions.searchUserFailure, (state, action) => ({
      ...state,
      searchResult: [],
      error: action.error,
    }))
  ),
});

export const {
  name,
  reducer,
  selectAppState,
  selectSearchTerm,
  selectSearchResult,
  selectError,
} = appFeature;
