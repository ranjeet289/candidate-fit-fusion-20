import { ShieldCheck, Search, Briefcase, UserPlus, Upload, ListChecks, CheckCircle, FileText } from 'lucide-react';

export interface TourStep {
  id: string;
  title: string;
  description: string;
  route: string;
  target: string | null;
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center';
  duration: number;
  icon: any;
  autoOpenSheet?: string;
}

// LEVEL 1: GETTING STARTED - Focus on 0-to-1 (First Submission)
export const level1Steps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Synapse!',
    description: 'Let\'s get your first candidate submitted. This is your path to success! Click Next to start.',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: ShieldCheck,
  },
  {
    id: 'jobs-search',
    title: 'Finding the Right Jobs',
    description: 'Type anything in the search bar to filter jobs instantly. Find roles that match your candidates.',
    route: '/jobs',
    target: '.search-and-filters',
    placement: 'bottom',
    duration: 5000,
    icon: Search,
  },
  {
    id: 'jobs-actions',
    title: 'Managing Your Jobs',
    description: 'Click the three-dot menu (⋮) to view job details, edit, or mark jobs as "Working".',
    route: '/jobs',
    target: '.jobs-table-actions',
    placement: 'left',
    duration: 5000,
    icon: Briefcase,
  },
  {
    id: 'submit-button',
    title: 'Adding Your First Candidate',
    description: 'Click "Submit Candidate" to add candidates manually or with AI resume parsing. This is where the magic happens!',
    route: '/candidates',
    target: '.submit-candidate-button',
    placement: 'left',
    duration: 6000,
    icon: UserPlus,
  },
  {
    id: 'resume-upload',
    title: 'AI-Powered Resume Parsing',
    description: 'Upload a resume (PDF, DOCX) and watch AI auto-fill all candidate details. Saves you 5+ minutes per submission!',
    route: '/candidates',
    target: '.resume-upload-area',
    placement: 'right',
    duration: 7000,
    icon: Upload,
    autoOpenSheet: 'submitCandidate',
  },
  {
    id: 'complete-submission',
    title: 'Complete Your First Submission',
    description: 'Fill in the job selection, fit score, and notes. Then hit Submit! This is your first step to earning placements.',
    route: '/candidates',
    target: '.submit-form-actions',
    placement: 'top',
    duration: 8000,
    icon: FileText,
  },
  {
    id: 'candidate-status',
    title: 'Understanding Candidate Status',
    description: 'Hover over any status badge to see what each pipeline stage means. Track your progress!',
    route: '/candidates',
    target: '.candidate-stage-column',
    placement: 'right',
    duration: 5000,
    icon: ListChecks,
  },
  {
    id: 'level1-complete',
    title: 'Level 1 Complete! 🎉',
    description: 'You\'ve learned the basics! Complete your first submission to unlock Level 2 and learn how to maximize your earnings.',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: CheckCircle,
  },
];
