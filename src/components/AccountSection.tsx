import React, { useState } from 'react';
import { User, Settings, LogOut } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  studentId: string;
  university: string;
}

const AccountSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profile] = useState<UserProfile>({
    name: "Demo Öğrenci",
    email: "demo@example.edu.tr",
    studentId: "2024123456",
    university: "Demo Üniversitesi"
  });

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
      >
        <User className="h-5 w-5" />
        <span className="hidden md:inline">Hesabım</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{profile.name}</p>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>

          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-xs text-gray-500">Öğrenci Numarası</p>
            <p className="text-sm text-gray-900">{profile.studentId}</p>
            <p className="text-xs text-gray-500 mt-1">Üniversite</p>
            <p className="text-sm text-gray-900">{profile.university}</p>
          </div>

          <div className="px-2 py-2">
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Ayarlar
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center">
              <LogOut className="h-4 w-4 mr-2" />
              Çıkış Yap
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSection;