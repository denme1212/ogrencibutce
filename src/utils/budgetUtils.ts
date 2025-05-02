import { Budget, BudgetCategory, BudgetItem } from '../types';

export const calculateTotalIncome = (budget: Budget): number => {
  return budget.income.reduce((total, item) => total + item.amount, 0);
};

export const calculateTotalExpenses = (budget: Budget): number => {
  return budget.expenses.reduce((total, item) => total + item.amount, 0);
};

export const calculateBalance = (budget: Budget): number => {
  return calculateTotalIncome(budget) - calculateTotalExpenses(budget);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const getCategoryById = (categories: BudgetCategory[], id: string): BudgetCategory | undefined => {
  return categories.find(category => category.id === id);
};

export const calculateCategoryTotal = (items: BudgetItem[], categoryId: string): number => {
  return items
    .filter(item => item.categoryId === categoryId)
    .reduce((total, item) => total + item.amount, 0);
};

export const groupItemsByCategory = (items: BudgetItem[], categories: BudgetCategory[]): Record<string, BudgetItem[]> => {
  const grouped: Record<string, BudgetItem[]> = {};
  
  categories.forEach(category => {
    grouped[category.id] = items.filter(item => item.categoryId === category.id);
  });
  
  return grouped;
};

export const getMonthlyData = (budget: Budget, month: string): Budget => {
  const [year, monthNum] = month.split('-');
  
  return {
    income: budget.income.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.getFullYear() === parseInt(year) && itemDate.getMonth() === parseInt(monthNum) - 1;
    }),
    expenses: budget.expenses.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.getFullYear() === parseInt(year) && itemDate.getMonth() === parseInt(monthNum) - 1;
    })
  };
};

export const getCurrentMonth = (): string => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

export const getMonthName = (monthString: string): string => {
  const [year, month] = monthString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  
  return date.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};