import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import { formatCurrency } from '../utils/budgetUtils';
import { Trash2, Plus, Minus } from 'lucide-react';

const SavingsGoalList: React.FC = () => {
  const { state, updateSavingsGoal, removeSavingsGoal } = useBudget();
  const { savingsGoals } = state;
  
  const [updateAmount, setUpdateAmount] = useState<string>('');
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [updateType, setUpdateType] = useState<'add' | 'subtract'>('add');
  
  const handleUpdateGoal = (goalId: string) => {
    if (!updateAmount || selectedGoalId !== goalId) return;
    
    const amount = parseFloat(updateAmount);
    if (isNaN(amount) || amount <= 0) return;
    
    const goal = savingsGoals.find(g => g.id === goalId);
    if (!goal) return;
    
    let newAmount = goal.currentAmount;
    
    if (updateType === 'add') {
      newAmount += amount;
    } else {
      newAmount = Math.max(0, newAmount - amount);
    }
    
    updateSavingsGoal(goalId, newAmount);
    setUpdateAmount('');
    setSelectedGoalId(null);
  };
  
  const calculateDaysRemaining = (deadline: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const targetDate = new Date(deadline);
    targetDate.setHours(0, 0, 0, 0);
    
    const differenceMs = targetDate.getTime() - today.getTime();
    return Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
  };
  
  if (savingsGoals.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Tasarruf Hedeflerim</h2>
        <p className="text-gray-500 text-center py-6">
          Henüz bir tasarruf hedefi eklenmemiş. Yeni bir hedef eklemek için yukarıdaki formu kullanabilirsiniz.
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Tasarruf Hedeflerim</h2>
      
      <div className="space-y-6">
        {savingsGoals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const daysRemaining = calculateDaysRemaining(goal.deadline);
          const isSelected = selectedGoalId === goal.id;
          
          return (
            <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-900">{goal.name}</h3>
                <button
                  onClick={() => removeSavingsGoal(goal.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Hedef: {formatCurrency(goal.targetAmount)}</span>
                <span>Mevcut: {formatCurrency(goal.currentAmount)}</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div 
                  className="h-2.5 rounded-full" 
                  style={{ width: `${Math.min(progress, 100)}%`, backgroundColor: goal.color }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 mb-4">
                <span>{Math.round(progress)}% tamamlandı</span>
                <span>
                  {daysRemaining > 0 
                    ? `${daysRemaining} gün kaldı` 
                    : 'Süre doldu'}
                </span>
              </div>
              
              <div className="mt-3">
                <button
                  onClick={() => {
                    setSelectedGoalId(isSelected ? null : goal.id);
                    setUpdateType('add');
                    setUpdateAmount('');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {isSelected ? 'İptal' : 'Güncelle'}
                </button>
                
                {isSelected && (
                  <div className="mt-3 flex items-center space-x-2">
                    <div className="flex border border-gray-300 rounded-md">
                      <button
                        type="button"
                        onClick={() => setUpdateType('add')}
                        className={`px-2 py-1 ${
                          updateType === 'add' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-white text-gray-700'
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpdateType('subtract')}
                        className={`px-2 py-1 ${
                          updateType === 'subtract' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-white text-gray-700'
                        }`}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={updateAmount}
                      onChange={(e) => setUpdateAmount(e.target.value)}
                      className="w-24 p-1 border border-gray-300 rounded-md text-sm"
                      placeholder="Miktar"
                    />
                    <button
                      onClick={() => handleUpdateGoal(goal.id)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                    >
                      Uygula
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavingsGoalList;