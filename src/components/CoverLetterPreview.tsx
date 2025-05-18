import React, { useState } from 'react';
import { DownloadIcon, CopyIcon, EditIcon, RefreshCwIcon as RefreshIcon, ArrowLeftIcon, CheckIcon } from 'lucide-react';
import { useCoverLetterContext } from '../context/CoverLetterContext';
import ProgressSteps from './ProgressSteps';

const CoverLetterPreview: React.FC = () => {
  const { coverLetterData, jobData, setCurrentStep } = useCoverLetterContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(coverLetterData?.content || '');
  const [selectedTemplate, setSelectedTemplate] = useState(coverLetterData?.template || 'professional');
  const [copied, setCopied] = useState(false);

  // Handler for copying cover letter to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(editedContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Handler for downloading cover letter as TXT
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([editedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Cover_Letter_${jobData?.company.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Templates available
  const templates = [
    { id: 'professional', name: 'Professional' },
    { id: 'modern', name: 'Modern' },
    { id: 'creative', name: 'Creative' },
    { id: 'simple', name: 'Simple' }
  ];

  // Apply template styling
  const getTemplateStyles = () => {
    switch (selectedTemplate) {
      case 'modern':
        return 'font-sans bg-white border-l-4 border-blue-500';
      case 'creative':
        return 'font-serif bg-blue-50';
      case 'simple':
        return 'font-mono bg-white border border-gray-200';
      case 'professional':
      default:
        return 'font-serif bg-white border border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ProgressSteps currentStep={4} />
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cover Letter</h2>
        <p className="text-gray-600">
          Here's your personalized cover letter. You can edit it, change the template, or download it.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="lg:w-3/4">
          <div className={`p-8 rounded-lg shadow-sm ${getTemplateStyles()}`}>
            {isEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full h-96 p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="whitespace-pre-wrap">{editedContent}</div>
            )}
          </div>
        </div>
        
        <div className="lg:w-1/4 space-y-6">
          {/* Template Selection */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Template</h3>
            <div className="space-y-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`w-full px-3 py-2 text-left text-sm rounded transition-colors ${
                    selectedTemplate === template.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Actions */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                {isEditing ? (
                  <>
                    <CheckIcon className="h-4 w-4 mr-2" /> Save Edits
                  </>
                ) : (
                  <>
                    <EditIcon className="h-4 w-4 mr-2" /> Edit Content
                  </>
                )}
              </button>
              
              <button
                onClick={handleCopy}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                {copied ? (
                  <>
                    <CheckIcon className="h-4 w-4 mr-2 text-green-500" /> Copied!
                  </>
                ) : (
                  <>
                    <CopyIcon className="h-4 w-4 mr-2" /> Copy to Clipboard
                  </>
                )}
              </button>
              
              <button
                onClick={handleDownload}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                <DownloadIcon className="h-4 w-4 mr-2" /> Download as TXT
              </button>
              
              <button
                onClick={() => setCurrentStep('job')}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                <RefreshIcon className="h-4 w-4 mr-2" /> Generate New Letter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep('job')}
          className="flex items-center text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back to Job Details
        </button>
        
        <button
          onClick={() => setCurrentStep('welcome')}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default CoverLetterPreview;