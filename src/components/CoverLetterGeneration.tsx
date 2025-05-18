import React, { useEffect } from 'react';
import { Wand2Icon } from 'lucide-react';
import { useCoverLetterContext } from '../context/CoverLetterContext';
import ProgressSteps from './ProgressSteps';

const CoverLetterGeneration: React.FC = () => {
  const { setCurrentStep, resumeData, jobData, setCoverLetterData } = useCoverLetterContext();

  useEffect(() => {
    // Simulate AI generation process
    const timer = setTimeout(() => {
      // In a real app, this would be an API call to an AI service
      const generatedContent = generateCoverLetter(resumeData, jobData);
      
      setCoverLetterData({
        content: generatedContent,
        template: 'professional',
        dateGenerated: new Date().toISOString()
      });
      
      setCurrentStep('preview');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Mock function to generate a cover letter based on resume and job data
  const generateCoverLetter = (resume: any, job: any) => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    return `${today}

Dear Hiring Manager,

I am writing to express my interest in the ${job.title} position at ${job.company}. With 5 years of experience in web development and a strong foundation in ${resume.skills.slice(0, 3).join(', ')}, I am confident in my ability to make a valuable contribution to your team.

The opportunity to apply my expertise in ${resume.skills[0]} and ${resume.skills[1]} to help ${job.company} achieve its goals is particularly exciting to me. Throughout my career, I have focused on developing responsive web applications and improving page load times, which aligns well with the requirements outlined in your job posting.

My background includes:
• Developing responsive web applications using modern frameworks
• Improving page load times by 40% through optimization techniques
• Collaborating with cross-functional teams to deliver high-quality products

I am particularly drawn to ${job.company}'s innovative approach to technology solutions and commitment to excellence. I believe that my skills and experience make me a strong candidate for this position, and I am excited about the possibility of joining your team.

Thank you for considering my application. I look forward to the opportunity to discuss how my background, skills, and experience would be beneficial to ${job.company}.

Sincerely,
[Your Name]`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ProgressSteps currentStep={3} />
      
      <div className="flex flex-col items-center justify-center py-12">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full border-4 border-t-blue-600 border-r-blue-600 border-b-blue-300 border-l-blue-300 animate-spin"></div>
          </div>
          <Wand2Icon className="h-8 w-8 text-blue-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-2">Generating Your Cover Letter</h2>
        <p className="text-gray-600 text-center max-w-md">
          Our AI is analyzing your resume and the job details to create a personalized cover letter...
        </p>

        <div className="w-full max-w-md mt-8">
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-blue-600 mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-blue-100 rounded-full w-full animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-blue-400 mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-blue-50 rounded-full w-3/4 animate-pulse delay-150"></div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-gray-300 mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-100 rounded-full w-1/2 animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGeneration;