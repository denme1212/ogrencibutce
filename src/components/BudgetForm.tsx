import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import { getCurrentMonth } from '../utils/budgetUtils';

type FormType = 'income' | 'expense';

const BudgetForm: React.FC = () => {
  const { state, addIncomeItem, addExpenseItem } = useBudget();
  const { categories } = state;
  
  const [activeTab, setActiveTab] = useState<FormType>('income');
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [error, setError] = useState<string | null>(null);
  
  const filteredCategories = categories.filter(
    category => category.type === activeTab
  );
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description || !categoryId || !date) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    
    const numAmount = parseFloat(amount);
    
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Lütfen geçerli bir miktar girin.');
      return;
    }
    
    const newItem = {
      amount: numAmount,
      description,
      categoryId,
      date,
    };
    
    if (activeTab === 'income') {
      addIncomeItem(newItem);
    } else {
      addExpenseItem(newItem);
    }
    
    // Reset form
    setAmount('');
    setDescription('');
    setCategoryId('');
    setError(null);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="mb-6 flex border-b">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'income'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('income')}
        >
          Gelir Ekle
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'expense'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('expense')}
        >
          Gider Ekle
        </button>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Miktar (₺)
            </label>
            <input
              type="number"
              id="amount"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Kategori
            </label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Kategori seçin</option>
              {filteredCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Açıklama
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Açıklama girin"
            />
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Tarih
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className={`px-4 py-2 rounded-md text-white font-medium ${
              activeTab === 'income'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-red-600 hover:bg-red-700'
            } transition-colors duration-200`}
          >
            {activeTab === 'income' ? 'Gelir Ekle' : 'Gider Ekle'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetForm;