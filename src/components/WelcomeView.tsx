import React from 'react';
import { FileTextIcon, BriefcaseIcon, Wand2Icon } from 'lucide-react';
import { useCoverLetterContext } from '../context/CoverLetterContext';

const WelcomeView: React.FC = () => {
  const { setCurrentStep } = useCoverLetterContext();

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
        Craft Perfect Cover Letters with AI
      </h2>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl">
        Upload your resume, add the job details, and let our AI create a personalized cover letter that showcases your skills and experience.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 w-full max-w-5xl">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FileTextIcon className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Resume</h3>
          <p className="text-gray-600 text-center">Upload your resume and we'll analyze your skills and experience.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <BriefcaseIcon className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Add Job Details</h3>
          <p className="text-gray-600 text-center">Enter the job description and requirements to tailor your cover letter.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Wand2Icon className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Generate Cover Letter</h3>
          <p className="text-gray-600 text-center">Our AI will craft a personalized cover letter that highlights your qualifications.</p>
        </div>
      </div>

      <button 
        onClick={() => setCurrentStep('resume')}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors shadow-sm"
      >
        Get Started
      </button>
    </div>
  );
};

export default WelcomeView;