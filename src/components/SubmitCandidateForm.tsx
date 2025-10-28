
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, FileText, Loader2 } from "lucide-react";
import PersonalInfoSection from "./forms/PersonalInfoSection";
import JobDetailsSection from "./forms/JobDetailsSection";
import FitScoreSection from "./forms/FitScoreSection";

interface SubmitCandidateFormProps {
  onClose: () => void;
}

export default function SubmitCandidateForm({ onClose }: SubmitCandidateFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    jobId: '',
    currentSalary: '',
    expectedSalary: '',
    noticePeriod: '',
    availability: '',
    skills: '',
    notes: ''
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateFitScore = () => {
    return Math.random() * 3 + 7; // Random score between 7.0 and 10.0
  };

  const fitScore = calculateFitScore();

  const mockParseResume = async (file: File) => {
    // Simulate AI parsing with realistic data
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        const names = ['John Doe', 'Jane Smith', 'Alex Johnson', 'Sarah Williams'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const nameParts = randomName.split(' ');
        
        resolve({
          firstName: nameParts[0],
          lastName: nameParts[1],
          email: `${randomName.toLowerCase().replace(' ', '.')}@email.com`,
          phone: '+1 (555) 123-4567',
          location: 'San Francisco, CA',
          experience: '5-8 years',
          skills: 'React, TypeScript, Node.js, AWS, Python',
          currentSalary: '$120,000',
          expectedSalary: '$140,000',
        });
      }, 2000);
    });
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a PDF or DOCX file');
      return;
    }

    setResumeFile(file);
    setIsParsing(true);
    
    try {
      const parsedData = await mockParseResume(file);
      setFormData(prev => ({ ...prev, ...parsedData }));
      toast.success('Resume parsed successfully!');
    } catch (error) {
      toast.error('Failed to parse resume');
    } finally {
      setIsParsing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = ['firstName', 'lastName', 'email', 'location', 'experience', 'jobId', 'skills'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (fitScore < 7.5) {
      toast.error(`Candidate rejected - Fit score ${fitScore.toFixed(1)} is below threshold of 7.5`);
    } else {
      toast.success(`Candidate submitted successfully with fit score ${fitScore.toFixed(1)}`);
    }
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      {/* Resume Upload Section */}
      <div className="space-y-4 p-4 border-2 border-dashed rounded-lg resume-upload-area">
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <div className="mt-4">
            <Label htmlFor="resume-upload" className="cursor-pointer">
              <span className="text-sm font-medium text-primary hover:text-primary/80">
                Upload Resume (PDF or DOCX)
              </span>
              <Input
                id="resume-upload"
                type="file"
                accept=".pdf,.docx"
                onChange={handleResumeUpload}
                className="hidden"
                disabled={isParsing}
              />
            </Label>
            <p className="text-xs text-muted-foreground mt-2">
              AI will automatically extract candidate information
            </p>
          </div>
        </div>
        
        {isParsing && (
          <div className="flex items-center justify-center gap-2 text-sm text-primary">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Parsing resume...</span>
          </div>
        )}
        
        {resumeFile && !isParsing && (
          <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm flex-1">{resumeFile.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setResumeFile(null);
                setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  location: '',
                  experience: '',
                  jobId: '',
                  currentSalary: '',
                  expectedSalary: '',
                  noticePeriod: '',
                  availability: '',
                  skills: '',
                  notes: ''
                });
              }}
            >
              Remove
            </Button>
          </div>
        )}
      </div>

      <PersonalInfoSection formData={formData} updateFormData={updateFormData} />
      <JobDetailsSection formData={formData} updateFormData={updateFormData} />
      <FitScoreSection fitScore={fitScore} />
      
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1" disabled={isParsing}>
          Submit Candidate
        </Button>
      </div>
    </form>
  );
}
