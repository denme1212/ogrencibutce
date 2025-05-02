import React from 'react';
import { useBudget } from '../context/BudgetContext';
import { X } from 'lucide-react';

const FinancialTips: React.FC = () => {
  const { state, toggleTips } = useBudget();
  const { showTips } = state;
  
  if (!showTips) return null;
  
  const tips = [
    "Aylık bütçe planı yapın ve harcamalarınızı not edin.",
    "Burslar ve öğrenci indirimleri hakkında araştırma yapın.",
    "Yurt, ev arkadaşı veya aile yanında kalma gibi barınma seçeneklerini değerlendirin.",
    "Toplu taşıma ve öğrenci kartı indirimlerinden yararlanın.",
    "İkinci el kitap ve ders materyalleri almayı düşünün.",
    "Yemek yapmayı öğrenin, dışarıda yemek yemeyi azaltın.",
    "Öğrenci indirimli etkinlikleri takip edin.",
    "Part-time iş fırsatlarını değerlendirin.",
    "Acil durumlar için küçük bir birikim yapın.",
    "Kredi kartı kullanımından kaçının veya limitli kullanın.",
  ];
  
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 relative">
      <button
        onClick={toggleTips}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <X className="h-4 w-4" />
      </button>
      
      <h3 className="text-lg font-semibold text-blue-800 mb-2">Öğrenciler İçin Bütçe İpuçları</h3>
      
      <ul className="list-disc pl-5 space-y-1">
        {tips.map((tip, index) => (
          <li key={index} className="text-sm text-blue-700">
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinancialTips;