import { Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BudgetRequestActions } from "./budget-request.actions";
import { of, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BudgetRequestEffects {
  LoadBudgetRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetRequestActions.loadBudgetRequests),
      switchMap(() => of([])
        // this.budgetRequestRepository.getBudgetRequests()
        //   .pipe(
        //     map(budgetRequests => BudgetRequestActions.loadBudgetRequestsSuccess({ budgetRequests })),
        //     catchError(error => of(BudgetRequestActions.loadBudgetRequestsFailure({ error })))
        //   )
      )
    )
  );

  constructor(
    private actions$: Actions
  ) {}
}