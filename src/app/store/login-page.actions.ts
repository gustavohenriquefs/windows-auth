import { createAction, props } from "@ngrx/store";
import { LoginModel } from "./login";

export const login = createAction(
  '[Login Page] Login',
  props<LoginModel>()
);