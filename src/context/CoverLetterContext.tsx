import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types for our data
type ResumeData = {
  fileName: string;
  content: string;
  skills: string[];
};

type JobData = {
  title: string;
  company: string;
  location?: string;
  description: string;
  skillsRequired: string[];
};

type CoverLetterData = {
  content: string;
  template: string;
  dateGenerated: string;
};

type Step = 'welcome' | 'resume' | 'job' | 'generating' | 'preview';

interface CoverLetterContextType {
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
  resumeData: ResumeData | null;
  setResumeData: (data: ResumeData) => void;
  jobData: JobData | null;
  setJobData: (data: JobData) => void;
  coverLetterData: CoverLetterData | null;
  setCoverLetterData: (data: CoverLetterData) => void;
}

// Create context with default values
const CoverLetterContext = createContext<CoverLetterContextType>({
  currentStep: 'welcome',
  setCurrentStep: () => {},
  resumeData: null,
  setResumeData: () => {},
  jobData: null,
  setJobData: () => {},
  coverLetterData: null,
  setCoverLetterData: () => {}
});

// Provider component
export const CoverLetterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData | null>(null);

  return (
    <CoverLetterContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        resumeData,
        setResumeData,
        jobData,
        setJobData,
        coverLetterData,
        setCoverLetterData
      }}
    >
      {children}
    </CoverLetterContext.Provider>
  );
};

// Custom hook for using the context
export const useCoverLetterContext = () => useContext(CoverLetterContext);