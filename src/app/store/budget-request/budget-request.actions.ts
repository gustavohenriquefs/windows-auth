import { createActionGroup, props } from "@ngrx/store";

export interface BudgetRequest {
  id: number;
  name: string;
  description: string;
  status: string;
  date: string;
} 

export const BudgetRequestActions = createActionGroup({
  source: 'Budget Request',
  events: {
    'Load Budget Requests': props<{ budgetRequests: BudgetRequest[] }>(),
    'Load Budget Request': props<{ budgetRequest: BudgetRequest }>(),
    'Create Budget Request': props<{ budgetRequest: BudgetRequest }>(),
    'Update Budget Request': props<{ budgetRequest: BudgetRequest }>(),
    'Delete Budget Request': props<{ budgetRequest: BudgetRequest }>(),
    'Budget Request Failure': props<{ error: string }>(),
    'Budget Request Failure Message': (error: string) => ({ error }),
  }
});