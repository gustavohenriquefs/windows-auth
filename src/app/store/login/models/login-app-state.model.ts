import { loginFeatureKey } from "../login.reducer";
import { State } from "./state.model";

export interface LoginAppState {
  [loginFeatureKey]: State;
}