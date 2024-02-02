import { UserModel } from '../../domain/models/user.model';
import { createActionGroup, emptyProps, props } from "@ngrx/store"

export const UserActions = createActionGroup({
  source: 'Login',
  events: {
    'User Login': props<{ login: UserModel }>(),
    'User Windows Login': emptyProps(),
    'Logged In With Success' : props<{ userAuth: UserModel }>(),
    'Logged Failure': props<{ error: string }>(),
    'Logged Failure Message': (error: string) => ({ error }),
    logout: emptyProps()
  } 
});