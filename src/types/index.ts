export interface BudgetCategory {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
}

export interface BudgetItem {
  id: string;
  categoryId: string;
  amount: number;
  description: string;
  date: string;
}

export interface Budget {
  income: BudgetItem[];
  expenses: BudgetItem[];
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  color: string;
}

export interface AppState {
  budget: Budget;
  categories: BudgetCategory[];
  savingsGoals: SavingsGoal[];
  currentMonth: string;
  showTips: boolean;
}