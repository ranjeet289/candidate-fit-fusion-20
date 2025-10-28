import { ShieldCheck, Search, Briefcase, UserPlus, Upload, ListChecks, CheckCircle } from 'lucide-react';

export interface TourStep {
  id: string;
  title: string;
  description: string;
  route: string;
  target: string | null;
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center';
  duration: number;
  icon: any;
  autoOpenSheet?: string; // Optional: sheet to auto-open during this step
}

export const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Synapse!',
    description: 'Your account is currently pending approval. Once approved, you\'ll be able to view jobs and add candidates to the platform. Let\'s show you around in the meantime!',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: ShieldCheck,
  },
  {
    id: 'jobs-search',
    title: 'Finding the Right Jobs',
    description: 'Use the search bar to find specific jobs by title, company, or recruiter. Apply filters to narrow down by status (Active, On Hold, Filled).',
    route: '/jobs',
    target: '.search-and-filters',
    placement: 'bottom',
    duration: 6000,
    icon: Search,
  },
  {
    id: 'jobs-actions',
    title: 'Managing Your Jobs',
    description: 'Click the three-dot menu (⋮) on any job to view details, edit, or mark it as "Working" to track which jobs you\'re actively recruiting for.',
    route: '/jobs',
    target: '.jobs-table-actions',
    placement: 'left',
    duration: 6000,
    icon: Briefcase,
  },
  {
    id: 'submit-button',
    title: 'Adding New Candidates',
    description: 'Click the "Submit Candidate" button to add candidates. You can manually enter details or upload a resume for automatic parsing.',
    route: '/candidates',
    target: '.submit-candidate-button',
    placement: 'left',
    duration: 5000,
    icon: UserPlus,
  },
  {
    id: 'resume-upload',
    title: 'AI-Powered Resume Parsing',
    description: 'Upload a resume (PDF, DOCX) and our AI automatically extracts candidate information including name, email, skills, and experience. Review and edit before submitting.',
    route: '/candidates',
    target: '.resume-upload-area',
    placement: 'right',
    duration: 7000,
    icon: Upload,
    autoOpenSheet: 'submitCandidate',
  },
  {
    id: 'candidate-status',
    title: 'Understanding Candidate Status',
    description: 'Each status badge shows where candidates are in your pipeline. Hover over any status to see detailed explanations of what each stage means.',
    route: '/candidates',
    target: '.candidate-stage-column',
    placement: 'right',
    duration: 6000,
    icon: ListChecks,
  },
  {
    id: 'complete',
    title: 'You\'re Ready to Start!',
    description: 'You now know how to search for jobs, mark them as working, submit candidates with resume parsing, and track their status. Full access will be enabled once your account is approved!',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: CheckCircle,
  },
];
