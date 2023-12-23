import { createReducer, on } from '@ngrx/store';
import { login } from './login-page.actions';
import { LoginModel } from './login';

export const initialLoginState: LoginModel = {
  email: '',
  password: ''
};

/**
 * Define a reducer function to handle changes in the counter value based on the provided actions.
 */
export const loginReducer = createReducer(
  initialLoginState,
  on(login, (state) => (
    { email: state.email, password: state.password }
  )),
);