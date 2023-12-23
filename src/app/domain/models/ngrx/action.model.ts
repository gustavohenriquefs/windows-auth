/**
 * @interface Action
 * Interface for NGRX Actions
 * 
 * @description
 * describe the action 
 * that will be dispatched in 
 * you application
 * 
 * @example
 * ```typescript
 *  {
 *    type: '[Auth API] Login Success'
 *  }
 * ```
 */
interface Action {
  type: string;
}