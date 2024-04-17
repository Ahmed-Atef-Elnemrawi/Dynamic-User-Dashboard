import { Injectable, inject } from '@angular/core';
import { UsersService } from '../user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { appActions } from './app-actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models';
import { Store } from '@ngrx/store';
import { State } from './app-feature';
import { selectCurrentPage } from '../../user/data-access/user-feature';

@Injectable()
export class AppEffects {
  private userService = inject(UsersService);
  private actions = inject(Actions);
  private store = inject(Store<State>);
  private currentPage = this.store.selectSignal(selectCurrentPage);

  searchUser$ = createEffect(() =>
    this.actions.pipe(
      ofType(appActions.searchUser),
      switchMap(({ id }) =>
        this.userService.getUsers$(this.currentPage()).pipe(
          map(({ data }) => {
            const result = this.filterUsers(data, +id);
            console.log(result);
            return appActions.searchUserSuccess({ users: result });
          }),

          catchError((err: HttpErrorResponse) =>
            of(appActions.searchUserFailure({ error: err.message }))
          )
        )
      )
    )
  );


  private filterUsers(users: User[], userId: number) {
    return users.filter((user) => +user.id === +userId);
  }
}
