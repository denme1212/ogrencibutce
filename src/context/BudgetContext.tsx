import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, Budget, BudgetCategory, BudgetItem, SavingsGoal } from '../types';
import { generateId, getCurrentMonth } from '../utils/budgetUtils';

interface BudgetContextType {
  state: AppState;
  addIncomeItem: (item: Omit<BudgetItem, 'id'>) => void;
  addExpenseItem: (item: Omit<BudgetItem, 'id'>) => void;
  removeItem: (id: string, type: 'income' | 'expense') => void;
  addCategory: (category: Omit<BudgetCategory, 'id'>) => void;
  removeCategory: (id: string) => void;
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id'>) => void;
  updateSavingsGoal: (id: string, amount: number) => void;
  removeSavingsGoal: (id: string) => void;
  setCurrentMonth: (month: string) => void;
  toggleTips: () => void;
}

const defaultCategories: BudgetCategory[] = [
  { id: 'scholarship', name: 'Burs', type: 'income', color: '#4ade80' },
  { id: 'family-support', name: 'Aile Desteği', type: 'income', color: '#22d3ee' },
  { id: 'part-time', name: 'Part-time İş', type: 'income', color: '#60a5fa' },
  { id: 'other-income', name: 'Diğer Gelirler', type: 'income', color: '#a78bfa' },
  { id: 'housing', name: 'Barınma', type: 'expense', color: '#f87171' },
  { id: 'food', name: 'Yemek', type: 'expense', color: '#fb923c' },
  { id: 'transportation', name: 'Ulaşım', type: 'expense', color: '#facc15' },
  { id: 'books', name: 'Kitaplar ve Malzemeler', type: 'expense', color: '#a3e635' },
  { id: 'internet', name: 'İnternet ve Telefon', type: 'expense', color: '#38bdf8' },
  { id: 'entertainment', name: 'Sosyal Aktiviteler', type: 'expense', color: '#c084fc' },
  { id: 'personal', name: 'Kişisel Bakım', type: 'expense', color: '#e879f9' },
  { id: 'savings', name: 'Birikim', type: 'expense', color: '#2dd4bf' },
  { id: 'other-expense', name: 'Diğer Giderler', type: 'expense', color: '#94a3b8' },
];

const initialState: AppState = {
  budget: {
    income: [],
    expenses: [],
  },
  categories: defaultCategories,
  savingsGoals: [],
  currentMonth: getCurrentMonth(),
  showTips: true,
};

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const savedState = localStorage.getItem('budgetState');
    return savedState ? JSON.parse(savedState) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('budgetState', JSON.stringify(state));
  }, [state]);

  const addIncomeItem = (item: Omit<BudgetItem, 'id'>) => {
    setState(prevState => ({
      ...prevState,
      budget: {
        ...prevState.budget,
        income: [...prevState.budget.income, { ...item, id: generateId() }],
      },
    }));
  };

  const addExpenseItem = (item: Omit<BudgetItem, 'id'>) => {
    setState(prevState => ({
      ...prevState,
      budget: {
        ...prevState.budget,
        expenses: [...prevState.budget.expenses, { ...item, id: generateId() }],
      },
    }));
  };

  const removeItem = (id: string, type: 'income' | 'expense') => {
    setState(prevState => ({
      ...prevState,
      budget: {
        ...prevState.budget,
        [type]: prevState.budget[type].filter(item => item.id !== id),
      },
    }));
  };

  const addCategory = (category: Omit<BudgetCategory, 'id'>) => {
    setState(prevState => ({
      ...prevState,
      categories: [...prevState.categories, { ...category, id: generateId() }],
    }));
  };

  const removeCategory = (id: string) => {
    setState(prevState => ({
      ...prevState,
      categories: prevState.categories.filter(category => category.id !== id),
      budget: {
        income: prevState.budget.income.filter(item => item.categoryId !== id),
        expenses: prevState.budget.expenses.filter(item => item.categoryId !== id),
      },
    }));
  };

  const addSavingsGoal = (goal: Omit<SavingsGoal, 'id'>) => {
    setState(prevState => ({
      ...prevState,
      savingsGoals: [...prevState.savingsGoals, { ...goal, id: generateId() }],
    }));
  };

  const updateSavingsGoal = (id: string, amount: number) => {
    setState(prevState => ({
      ...prevState,
      savingsGoals: prevState.savingsGoals.map(goal => 
        goal.id === id ? { ...goal, currentAmount: amount } : goal
      ),
    }));
  };

  const removeSavingsGoal = (id: string) => {
    setState(prevState => ({
      ...prevState,
      savingsGoals: prevState.savingsGoals.filter(goal => goal.id !== id),
    }));
  };

  const setCurrentMonth = (month: string) => {
    setState(prevState => ({
      ...prevState,
      currentMonth: month,
    }));
  };

  const toggleTips = () => {
    setState(prevState => ({
      ...prevState,
      showTips: !prevState.showTips,
    }));
  };

  return (
    <BudgetContext.Provider
      value={{
        state,
        addIncomeItem,
        addExpenseItem,
        removeItem,
        addCategory,
        removeCategory,
        addSavingsGoal,
        updateSavingsGoal,
        removeSavingsGoal,
        setCurrentMonth,
        toggleTips,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = (): BudgetContextType => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};