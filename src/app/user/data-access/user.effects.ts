import { Injectable, inject } from "@angular/core";
import { UsersService } from "../../core/user.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { userActions } from "./user-actions";
import { catchError, map, mergeMap, of, switchMap, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { State } from "./user-feature";


@Injectable()
export class UserEffects {
  userService = inject(UsersService);
  actions = inject(Actions);
  store = inject(Store<State>)

  getUsers$ = createEffect(() => this.actions.pipe(
    ofType(userActions.getUsers),
    mergeMap(({page}) => this.userService.getUsers$(page).pipe(
      map((res) => userActions.getUsersSuccess({ response: res })),
      catchError((err: HttpErrorResponse) => of(userActions.getUsersFailure({ error: err.message })))
    ))));

  getUser = createEffect(() => this.actions.pipe(
    ofType(userActions.getUser),
    switchMap(({ userId }) => this.userService.getUser$(userId).pipe(
      map(({data}) => userActions.getUserSuccess({ user:data })),
      catchError((err: HttpErrorResponse) =>
        of(userActions.getUserFailure({ error: err.message })))
    ))
  ))
}
