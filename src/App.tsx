import React from 'react';
import { BudgetProvider } from './context/BudgetContext';
import Header from './components/Header';
import BudgetCalculator from './pages/BudgetCalculator';
import Footer from './components/Footer';

function App() {
  return (
    <BudgetProvider>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <main className="flex-grow">
          <BudgetCalculator />
        </main>
        <Footer />
      </div>
    </BudgetProvider>
  );
}

export default App;