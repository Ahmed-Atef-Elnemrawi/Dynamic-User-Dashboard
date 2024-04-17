import { createActionGroup, props } from "@ngrx/store";
import { User } from "../../core/models";
import { Response } from "../../core/user.service";


export const userActions = createActionGroup({
  'source': 'User',
  events:{
    'get users': props<{page:number}>(),
    'get users success': props<{response:Response}>(),
    'get users failure': props<{error: string}>(),

    'get user': props<{userId: number}>(),
    'get user success': props<{user: User}>(),
    'get user failure': props<{error:string}>(),
  }
})

export const {
  getUsers,
  getUsersSuccess,
  getUsersFailure,
  getUser,
  getUserSuccess,
  getUserFailure
} = userActions
