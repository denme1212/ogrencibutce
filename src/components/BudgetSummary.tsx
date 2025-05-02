import React from 'react';
import { useBudget } from '../context/BudgetContext';
import { calculateTotalIncome, calculateTotalExpenses, calculateBalance, formatCurrency, getMonthlyData, getMonthName } from '../utils/budgetUtils';
import { ArrowDownCircle, ArrowUpCircle, PiggyBank } from 'lucide-react';

const BudgetSummary: React.FC = () => {
  const { state } = useBudget();
  const { budget, currentMonth } = state;
  
  const monthlyBudget = getMonthlyData(budget, currentMonth);
  const totalIncome = calculateTotalIncome(monthlyBudget);
  const totalExpenses = calculateTotalExpenses(monthlyBudget);
  const balance = calculateBalance(monthlyBudget);
  
  const savingsPercentage = totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{getMonthName(currentMonth)} Bütçe Özeti</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 flex items-center">
          <div className="mr-4 bg-blue-100 p-2 rounded-full">
            <ArrowDownCircle className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Toplam Gelir</p>
            <p className="text-xl font-bold text-gray-800">{formatCurrency(totalIncome)}</p>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4 flex items-center">
          <div className="mr-4 bg-red-100 p-2 rounded-full">
            <ArrowUpCircle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Toplam Gider</p>
            <p className="text-xl font-bold text-gray-800">{formatCurrency(totalExpenses)}</p>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 flex items-center">
          <div className="mr-4 bg-green-100 p-2 rounded-full">
            <PiggyBank className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Kalan Bakiye</p>
            <p className={`text-xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(balance)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Tasarruf Oranı</span>
          <span className={`text-sm font-medium ${savingsPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {savingsPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${savingsPercentage >= 0 ? 'bg-green-600' : 'bg-red-600'}`} 
            style={{ width: `${Math.abs(Math.min(Math.max(savingsPercentage, 0), 100))}%` }}
          ></div>
        </div>
      </div>
      
      {balance < 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-700">
            Uyarı: Bu ay giderleriniz gelirlerinizi aşıyor. Bütçe dengesini sağlamak için giderlerinizi azaltmayı veya ek gelir kaynakları bulmayı düşünebilirsiniz.
          </p>
        </div>
      )}
      
      {balance > 0 && savingsPercentage > 20 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-700">
            Tebrikler! Bu ay sağlıklı bir tasarruf oranına sahipsiniz. Bu tasarrufları bir yatırım hesabına aktarmayı düşünebilirsiniz.
          </p>
        </div>
      )}
    </div>
  );
};

export default BudgetSummary;