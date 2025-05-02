import React from 'react';
import { useBudget } from '../context/BudgetContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MonthSelector: React.FC = () => {
  const { state, setCurrentMonth } = useBudget();
  const { currentMonth } = state;
  
  const [year, month] = currentMonth.split('-').map(Number);
  
  const handlePreviousMonth = () => {
    let newMonth = month - 1;
    let newYear = year;
    
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
    
    setCurrentMonth(`${newYear}-${String(newMonth).padStart(2, '0')}`);
  };
  
  const handleNextMonth = () => {
    let newMonth = month + 1;
    let newYear = year;
    
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    
    setCurrentMonth(`${newYear}-${String(newMonth).padStart(2, '0')}`);
  };
  
  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  
  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-6">
      <button 
        onClick={handlePreviousMonth}
        className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
      >
        <ChevronLeft className="h-5 w-5 text-gray-600" />
      </button>
      
      <h2 className="text-lg font-semibold text-gray-800">
        {monthNames[month - 1]} {year}
      </h2>
      
      <button 
        onClick={handleNextMonth}
        className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
      >
        <ChevronRight className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );
};

export default MonthSelector;