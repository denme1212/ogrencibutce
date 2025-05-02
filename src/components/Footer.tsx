import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Öğrenci Bütçe Hesaplama</h3>
            <p className="text-gray-300 text-sm">
              Öğrencilerin finansal okuryazarlığını artırmak ve bütçelerini etkili bir şekilde yönetmelerine yardımcı olmak için tasarlanmış bir platformdur.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white">Ana Sayfa</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Bütçe Hesaplama</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Burs Fırsatları</a></li>
              <li><a href="https://www.kariyer.net/is-ilanlari/universite+ogrencisi" className="text-gray-300 hover:text-white">Part-time İş İlanları</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Öğrenci İndirimleri</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <address className="text-gray-300 text-sm not-italic">
              <p>Öğrenci Bütçe Hesaplama</p>
              <p>Sakarya Mahallesi</p>
              <p>817 Sokak No2 35240 Konak/İzmir</p>
              <p className="mt-2">Email: destek@ogrencibutce.com.tr</p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Öğrenci Bütçe Hesaplama. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
