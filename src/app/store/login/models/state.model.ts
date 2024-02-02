import { UserModel } from "../../../domain/models/user.model";
import { LoadStatus } from "../enums/load.enum";

/**
 * @interface State
 * Interface for NGRX State
 * 
 * @description
 * defines the state of the application
 * 
 * @example
 * ```typescript
 *  {
 *    user: null,
 *    userError: null,
 *    loadStatus: loadStatus.NOT_LOADED
 *  }
 * ```
 */
export interface State {
  user: null | UserModel;
  userError: string | null;
  loadStatus: LoadStatus;
}
