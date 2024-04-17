import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models';

/**
 * Groups user search related actions.
 */
export const appActions = createActionGroup({
  source: 'App',
  events: {
    'search user': props<{ id: number | string }>(),
    'search user success': props<{ users: User[] }>(),
    'search user failure': props<{ error: string }>(),
  },
});

export const {
  searchUser,
  searchUserSuccess,
  searchUserFailure,
} = appActions;
