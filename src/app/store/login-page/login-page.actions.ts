import { createAction, props } from "@ngrx/store";
import { LoginModel } from "../models/login";
import { UserModel } from "../../domain/models/user.model";

export const login = createAction(
  '[Login Page] Login',
  props<LoginModel>()
);

export const loginWindows = createAction(
  '[Login Page] Login Windows'
);


export const loginSuccess = createAction(
  '[Login Page] Login Success',
  props<UserModel>()
);