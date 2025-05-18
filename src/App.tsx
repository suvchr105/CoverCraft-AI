import React from 'react';
import { BriefcaseIcon } from 'lucide-react';
import { CoverLetterProvider } from './context/CoverLetterContext';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';

function App() {
  return (
    <CoverLetterProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </CoverLetterProvider>
  );
}

export default App;