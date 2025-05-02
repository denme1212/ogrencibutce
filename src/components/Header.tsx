import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import AccountSection from './AccountSection';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleResources = () => setIsResourcesOpen(!isResourcesOpen);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-blue-700 font-bold text-xl">Öğrenci Bütçe Hesaplama</span>
            </div>
          </div>
          
          <nav className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <a href="#" className="border-blue-700 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Bütçe Hesaplama
            </a>
            <div className="relative">
              <button 
                className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
                onClick={toggleResources}
              >
                Öğrenci Kaynakları
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isResourcesOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <a href="https://tubitak.gov.tr/tr/burslar/lisans/burs-programlari" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Burs Fırsatları</a>
                    <a href="https://www.kariyer.net/is-ilanlari/izmir-part+time" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Part-time İş İlanları</a>
                    <a href="https://biogrenci.com/?gad_source=1&gbraid=0AAAAAqFjO9GgCpW8jdlLUTAhPLnto9Mc0&gclid=Cj0KCQjw2tHABhCiARIsANZzDWpeYSVXDPafooJPQDI1asll7OpH2zmAbJgwM4IBzA8LR9KdS2Iri5gaAqTDEALw_wcB" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Öğrenci İndirimleri</a>
                  </div>
                </div>
              )}
            </div>
            <a href="#" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
              Hakkında
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
              İletişim
            </a>
            <AccountSection />
          </nav>
          
          <div className="flex items-center md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={toggleMenu}
            >
              <span className="sr-only">Menüyü aç</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a href="#" className="bg-blue-50 border-blue-700 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              Bütçe Hesaplama
            </a>
            <button 
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left"
              onClick={toggleResources}
            >
              <div className="flex justify-between items-center">
                Öğrenci Kaynakları
                <ChevronDown className="h-4 w-4" />
              </div>
            </button>
            {isResourcesOpen && (
              <div className="pl-6 space-y-1">
                <a href="#" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-sm font-medium">
                  Burs Fırsatları
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-sm font-medium">
                  Part-time İş İlanları
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-sm font-medium">
                  Öğrenci İndirimleri
                </a>
              </div>
            )}
            <a href="#" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              Hakkında
            </a>
            <a href="#" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              İletişim
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
