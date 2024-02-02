import { createReducer, on } from '@ngrx/store';
import { UserActions } from './login.actions';
import { State } from './models/state.model';
import { LoadStatus } from './enums/load.enum';

export const loginFeatureKey = 'Login';

export const initialState: State = {
  user: null,
  userError: null,
  loadStatus: LoadStatus.NOT_LOADED
};

export const loginReducer = createReducer(
  initialState,
  on(UserActions.userLogin, (state, { login }) => ({
    ...state,
    loadStatus: LoadStatus.LOADING,
    userError: null,
    user: login 
  })),
  on(UserActions.userWindowsLogin, (state) => ({
    ...state,
    loadStatus: LoadStatus.LOADING,
  })),
  on(UserActions.loggedInWithSuccess, (state, { userAuth }) => ({
    ...state,
    loadStatus: LoadStatus.LOADED,
    user: userAuth,
  })),
  on(UserActions.loggedFailure, (state, { error }) => ({
    ...state,
    loadStatus: LoadStatus.ERROR,
    userError: error,
    user: null,
  })),
  on(UserActions.loggedFailureMessage, (state, { error }) => ({
    ...state,
    loadStatus: LoadStatus.ERROR,
    userError: error,
    user: null,
  })),
);