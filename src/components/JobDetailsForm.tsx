import React, { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, BriefcaseIcon, BuildingIcon, MapPinIcon } from 'lucide-react';
import { useCoverLetterContext } from '../context/CoverLetterContext';
import ProgressSteps from './ProgressSteps';

const JobDetailsForm: React.FC = () => {
  const { setCurrentStep, setJobData, resumeData } = useCoverLetterContext();
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    skillsRequired: ''
  });
  
  const [formErrors, setFormErrors] = useState({
    title: false,
    company: false,
    description: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = {
      title: !formData.title.trim(),
      company: !formData.company.trim(),
      description: !formData.description.trim()
    };
    
    if (errors.title || errors.company || errors.description) {
      setFormErrors(errors);
      return;
    }
    
    // Save data and move to next step
    setJobData({
      title: formData.title,
      company: formData.company,
      location: formData.location,
      description: formData.description,
      skillsRequired: formData.skillsRequired.split(',').map(skill => skill.trim())
    });
    
    setCurrentStep('generating');
  };

  // Generate suggested skills based on resume
  const suggestedSkills = resumeData?.skills || [];

  return (
    <div className="max-w-4xl mx-auto">
      <ProgressSteps currentStep={2} />
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Job Details</h2>
        <p className="text-gray-600">
          Enter information about the job you're applying for so we can tailor your cover letter.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Job Title*
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BriefcaseIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`pl-10 block w-full rounded-md border ${
                  formErrors.title ? 'border-red-300' : 'border-gray-300'
                } py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Software Engineer"
              />
            </div>
            {formErrors.title && (
              <p className="mt-1 text-sm text-red-600">Job title is required</p>
            )}
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name*
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BuildingIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`pl-10 block w-full rounded-md border ${
                  formErrors.company ? 'border-red-300' : 'border-gray-300'
                } py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Acme Corporation"
              />
            </div>
            {formErrors.company && (
              <p className="mt-1 text-sm text-red-600">Company name is required</p>
            )}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPinIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="San Francisco, CA or Remote"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Job Description*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            className={`block w-full rounded-md border ${
              formErrors.description ? 'border-red-300' : 'border-gray-300'
            } py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Paste the job description here..."
          />
          {formErrors.description && (
            <p className="mt-1 text-sm text-red-600">Job description is required</p>
          )}
        </div>
        
        <div className="mb-2">
          <label htmlFor="skillsRequired" className="block text-sm font-medium text-gray-700 mb-1">
            Key Skills Required (Optional)
          </label>
          <input
            type="text"
            id="skillsRequired"
            name="skillsRequired"
            value={formData.skillsRequired}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., JavaScript, React, Node.js"
          />
          <p className="mt-1 text-xs text-gray-500">Separate skills with commas</p>
        </div>
        
        {suggestedSkills.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Suggested skills from your resume:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedSkills.map((skill, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    const currentSkills = formData.skillsRequired
                      ? formData.skillsRequired.split(',').map(s => s.trim())
                      : [];
                    
                    if (!currentSkills.includes(skill)) {
                      const newSkills = [...currentSkills, skill].join(', ');
                      setFormData(prev => ({ ...prev, skillsRequired: newSkills }));
                    }
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full transition-colors"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep('resume')}
          className="flex items-center text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back
        </button>
        
        <button
          onClick={handleSubmit}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Generate Cover Letter <ArrowRightIcon className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default JobDetailsForm;