import React from 'react';
import { useBudget } from '../context/BudgetContext';
import { BudgetItem, BudgetCategory } from '../types';
import { formatCurrency, getMonthlyData } from '../utils/budgetUtils';
import { Trash2 } from 'lucide-react';

interface BudgetListProps {
  type: 'income' | 'expense';
}

const BudgetList: React.FC<BudgetListProps> = ({ type }) => {
  const { state, removeItem } = useBudget();
  const { budget, categories, currentMonth } = state;
  
  const monthlyBudget = getMonthlyData(budget, currentMonth);
  const items = type === 'income' ? monthlyBudget.income : monthlyBudget.expenses;
  const filteredCategories = categories.filter(cat => cat.type === type);
  
  const getCategoryName = (categoryId: string): string => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Bilinmeyen Kategori';
  };
  
  const getCategoryColor = (categoryId: string): string => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : '#cccccc';
  };
  
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {type === 'income' ? 'Gelir Listesi' : 'Gider Listesi'}
        </h2>
        <p className="text-gray-500 text-center py-6">
          {type === 'income' 
            ? 'Henüz gelir kaydedilmemiş. Gelir eklemek için "Gelir Ekle" sekmesini kullanabilirsiniz.' 
            : 'Henüz gider kaydedilmemiş. Gider eklemek için "Gider Ekle" sekmesini kullanabilirsiniz.'}
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {type === 'income' ? 'Gelir Listesi' : 'Gider Listesi'}
      </h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Açıklama
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tarih
              </th>
              <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Miktar
              </th>
              <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: getCategoryColor(item.categoryId) }}></div>
                    <span className="text-sm text-gray-900">{getCategoryName(item.categoryId)}</span>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.description}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(item.date).toLocaleDateString('tr-TR')}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-right font-medium">
                  {formatCurrency(item.amount)}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => removeItem(item.id, type)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetList;