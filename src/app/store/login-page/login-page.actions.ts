import { createAction, props } from "@ngrx/store";
import { LoginModel } from "../models/login";

export const login = createAction(
  '[Login Page] Login',
  props<LoginModel>()
);

export const loginWindows = createAction(
  '[Login Page] Login Windows',
  props<LoginModel>()
);


export const loginSuccess = createAction(
  '[Login Page] Login Success',
  props<{ login: LoginModel }>()
);