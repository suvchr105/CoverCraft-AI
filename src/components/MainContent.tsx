import React from 'react';
import { useCoverLetterContext } from '../context/CoverLetterContext';
import WelcomeView from './WelcomeView';
import ResumeUpload from './ResumeUpload';
import JobDetailsForm from './JobDetailsForm';
import CoverLetterGeneration from './CoverLetterGeneration';
import CoverLetterPreview from './CoverLetterPreview';

const MainContent: React.FC = () => {
  const { currentStep } = useCoverLetterContext();

  return (
    <main className="flex-grow py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {currentStep === 'welcome' && <WelcomeView />}
        {currentStep === 'resume' && <ResumeUpload />}
        {currentStep === 'job' && <JobDetailsForm />}
        {currentStep === 'generating' && <CoverLetterGeneration />}
        {currentStep === 'preview' && <CoverLetterPreview />}
      </div>
    </main>
  );
};

export default MainContent;