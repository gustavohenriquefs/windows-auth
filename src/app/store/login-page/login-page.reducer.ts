import { createReducer, on } from '@ngrx/store';
import { login, loginWindows } from './login-page.actions';
import { LoginModel } from '../models/login';

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
  on(loginWindows, windowsLogin),
);

function windowsLogin(state: any) {
  console.log('loginWindows');
  return ({ email: state.email, password: state.password });
}