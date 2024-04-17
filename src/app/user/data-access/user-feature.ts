import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../core/models';
import { userActions } from './user-actions';
import * as App from '../../core/store/app-feature';

export interface State extends App.State {
  user: UserState;
}

export interface UserState {
  users: User[];
  currentUser: User | null;
  error: string | null;
  currentPage: number;
  totalPage:number,
  isLoading:boolean;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  error: null,
  currentPage: 0,
  totalPage: 0,
  isLoading: false
};

export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,
    on(userActions.getUsers, (state, {page}) => ({
      ...state,
      error: null,
      currentPage: page,
      isLoading:true
    })),

    on(userActions.getUsersSuccess, (state, { response }) => ({
      ...state,
      users: response.data,
      totalPage:response.total_pages,
      isLoading:false,
      error: null,
    })),

    on(userActions.getUsersFailure, (state, { error }) => ({
      ...state,
      users: [],
      error,
    })),

    on(userActions.getUser, (state) => ({
      ...state,
      currentUser: null,
      error: null,
      isLoading:true,
    })),

    on(userActions.getUserSuccess, (state, { user }) => ({
      ...state,
      currentUser: user,
      error: null,
      isLoading:false
    })),

    on(userActions.getUserFailure, (state, { error }) => ({
      ...state,
      currentUser: null,
      error,
    }))
  ),
});

export const {
  name,
  selectUserState,
  selectUsers,
  selectError,
  selectCurrentUser,
  selectCurrentPage,
  selectTotalPage,
  selectIsLoading,
} = userFeature;
