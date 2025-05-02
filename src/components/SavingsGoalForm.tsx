import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';

const SavingsGoalForm: React.FC = () => {
  const { addSavingsGoal } = useBudget();
  
  const [name, setName] = useState<string>('');
  const [targetAmount, setTargetAmount] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [color, setColor] = useState<string>('#3b82f6');
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !targetAmount || !deadline) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    
    const amount = parseFloat(targetAmount);
    
    if (isNaN(amount) || amount <= 0) {
      setError('Lütfen geçerli bir hedef miktar girin.');
      return;
    }
    
    addSavingsGoal({
      name,
      targetAmount: amount,
      currentAmount: 0,
      deadline,
      color,
    });
    
    // Reset form
    setName('');
    setTargetAmount('');
    setDeadline('');
    setColor('#3b82f6');
    setError(null);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Yeni Tasarruf Hedefi Ekle</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Hedef Adı
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tatil, Araba, Ev..."
            />
          </div>
          
          <div>
            <label htmlFor="target-amount" className="block text-sm font-medium text-gray-700 mb-1">
              Hedef Miktar (₺)
            </label>
            <input
              type="number"
              id="target-amount"
              min="1"
              step="0.01"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>
          
          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
              Hedef Tarihi
            </label>
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
              Renk
            </label>
            <div className="flex items-center">
              <input
                type="color"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-10 p-0 border-0"
              />
              <span className="ml-2 text-sm text-gray-500">Hedef için bir renk seçin</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
          >
            Tasarruf Hedefi Ekle
          </button>
        </div>
      </form>
    </div>
  );
};

export default SavingsGoalForm;