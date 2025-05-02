import React from 'react';
import MonthSelector from '../components/MonthSelector';
import BudgetSummary from '../components/BudgetSummary';
import BudgetForm from '../components/BudgetForm';
import BudgetList from '../components/BudgetList';
import BudgetChart from '../components/BudgetChart';
import SavingsGoalForm from '../components/SavingsGoalForm';
import SavingsGoalList from '../components/SavingsGoalList';
import FinancialTips from '../components/FinancialTips';
import BudgetPDF from '../components/BudgetPDF';

const BudgetCalculator: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Bütçe Hesaplama</h1>
        <BudgetPDF />
      </div>
      
      <FinancialTips />
      
      <MonthSelector />
      
      <BudgetSummary />
      
      <BudgetForm />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <BudgetList type="income" />
        <BudgetList type="expense" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <BudgetChart type="income" />
        <BudgetChart type="expense" />
      </div>
      
      <SavingsGoalForm />
      
      <SavingsGoalList />
    </div>
  );
};

export default BudgetCalculator;