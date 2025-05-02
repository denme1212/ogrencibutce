import React, { useEffect, useRef } from 'react';
import { useBudget } from '../context/BudgetContext';
import { calculateCategoryTotal, getCategoryById, getMonthlyData } from '../utils/budgetUtils';

interface ChartProps {
  type: 'income' | 'expense';
}

const BudgetChart: React.FC<ChartProps> = ({ type }) => {
  const { state } = useBudget();
  const { budget, categories, currentMonth } = state;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const monthlyBudget = getMonthlyData(budget, currentMonth);
  const items = type === 'income' ? monthlyBudget.income : monthlyBudget.expenses;
  const filteredCategories = categories.filter(cat => cat.type === type);
  
  const categoryTotals = filteredCategories.map(category => {
    const total = calculateCategoryTotal(items, category.id);
    return {
      id: category.id,
      name: category.name,
      color: category.color,
      total,
    };
  }).filter(cat => cat.total > 0);
  
  const totalAmount = categoryTotals.reduce((sum, category) => sum + category.total, 0);
  
  // Draw pie chart
  useEffect(() => {
    if (!canvasRef.current || categoryTotals.length === 0) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    let startAngle = 0;
    categoryTotals.forEach(category => {
      const portion = category.total / totalAmount;
      const endAngle = startAngle + portion * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = category.color;
      ctx.fill();
      
      startAngle = endAngle;
    });
    
    // Draw circle in the middle to create a donut chart
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
  }, [categoryTotals]);
  
  if (categoryTotals.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {type === 'income' ? 'Gelir Dağılımı' : 'Gider Dağılımı'}
        </h2>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">
            {type === 'income' 
              ? 'Gösterilecek gelir verisi bulunmamaktadır.' 
              : 'Gösterilecek gider verisi bulunmamaktadır.'}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {type === 'income' ? 'Gelir Dağılımı' : 'Gider Dağılımı'}
      </h2>
      
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <div className="relative h-64">
            <canvas ref={canvasRef} width={250} height={250} className="mx-auto" />
          </div>
        </div>
        
        <div className="md:w-1/2 mt-6 md:mt-0">
          <div className="space-y-3">
            {categoryTotals.map(category => {
              const percentage = Math.round((category.total / totalAmount) * 100);
              return (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
                    <span className="text-sm text-gray-700">{category.name}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">{percentage}%</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetChart;