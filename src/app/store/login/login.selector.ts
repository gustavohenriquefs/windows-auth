import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./models/state.model";
import { loginFeatureKey } from "./login.reducer";

const selectLoginState = createFeatureSelector<State>(loginFeatureKey);

const selectLoadState = createSelector(
  selectLoginState,
  (state) => state.loadStatus
);

const selectUser = createSelector(
  selectLoginState,
  (state) => state.user
);

const selectError = createSelector(
  selectLoginState,
  (state) => state.userError
);

export const fromLogin = {
  selectLoginState,
  selectLoadState,
  selectUser,
  selectError
}