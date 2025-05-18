import React from 'react';
import { FileTextIcon } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FileTextIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">
                CoverCraft <span className="text-blue-600">AI</span>
              </h1>
              <p className="text-xs text-gray-500">Craft perfect cover letters in seconds</p>
            </div>
          </div>
          <nav className="flex space-x-4">
            <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              How It Works
            </button>
            <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Templates
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Sign In
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;