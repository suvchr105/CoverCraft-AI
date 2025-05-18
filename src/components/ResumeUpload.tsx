import React, { useState } from 'react';
import { FileUpIcon, CheckCircleIcon, AlertCircleIcon, ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { useCoverLetterContext } from '../context/CoverLetterContext';
import ProgressSteps from './ProgressSteps';

const ResumeUpload: React.FC = () => {
  const { setCurrentStep, setResumeData } = useCoverLetterContext();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [parsedText, setParsedText] = useState('');

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is PDF, DOCX, or TXT
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (!validTypes.includes(file.type)) {
      setUploadStatus('error');
      return;
    }

    setFile(file);
    
    // Simulate parsing the resume
    setTimeout(() => {
      // In a real app, this would be actual resume parsing logic
      const mockParsedText = `PROFESSIONAL SUMMARY\nDedicated software engineer with 5 years of experience in web development.\n\nSKILLS\nJavaScript, React, Node.js, TypeScript, HTML, CSS\n\nEXPERIENCE\nSenior Frontend Developer - TechCorp (2020-Present)\n- Developed responsive web applications\n- Improved page load times by 40%\n\nEDUCATION\nBS in Computer Science - Tech University`;
      
      setParsedText(mockParsedText);
      setResumeData({
        fileName: file.name,
        content: mockParsedText,
        skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'HTML', 'CSS']
      });
      setUploadStatus('success');
    }, 1500);
  };

  const handleContinue = () => {
    setCurrentStep('job');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ProgressSteps currentStep={1} />
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Resume</h2>
        <p className="text-gray-600">
          Upload your resume so we can analyze your skills and experience to create a personalized cover letter.
        </p>
      </div>

      <div 
        className={`border-2 border-dashed rounded-lg p-8 mb-8 text-center transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 
          uploadStatus === 'success' ? 'border-green-500 bg-green-50' : 
          uploadStatus === 'error' ? 'border-red-500 bg-red-50' : 
          'border-gray-300 hover:border-blue-400 bg-white'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {uploadStatus === 'idle' && (
          <>
            <FileUpIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Drag and drop your resume here
            </h3>
            <p className="text-gray-500 mb-4">
              Or click to browse (PDF, DOCX, or TXT)
            </p>
            <input
              type="file"
              id="resume-upload"
              className="hidden"
              accept=".pdf,.docx,.txt"
              onChange={handleFileInput}
            />
            <button
              onClick={() => document.getElementById('resume-upload')?.click()}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Select File
            </button>
          </>
        )}

        {uploadStatus === 'success' && (
          <>
            <CheckCircleIcon className="h-12 w-12 mx-auto text-green-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Resume uploaded successfully
            </h3>
            <p className="text-gray-700 mb-2">
              {file?.name}
            </p>
            <div className="bg-white p-4 rounded border border-gray-200 text-left max-h-64 overflow-y-auto mb-4">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">{parsedText}</pre>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setUploadStatus('idle');
                setParsedText('');
              }}
              className="text-gray-600 hover:text-gray-900 underline text-sm"
            >
              Change file
            </button>
          </>
        )}

        {uploadStatus === 'error' && (
          <>
            <AlertCircleIcon className="h-12 w-12 mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Unable to upload file
            </h3>
            <p className="text-gray-500 mb-4">
              Please make sure your file is in PDF, DOCX, or TXT format.
            </p>
            <button
              onClick={() => {
                setFile(null);
                setUploadStatus('idle');
              }}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Try Again
            </button>
          </>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep('welcome')}
          className="flex items-center text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back
        </button>
        
        <button
          onClick={handleContinue}
          disabled={uploadStatus !== 'success'}
          className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            uploadStatus === 'success'
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue <ArrowRightIcon className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ResumeUpload;