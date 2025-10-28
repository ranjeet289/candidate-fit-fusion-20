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
    description: 'Let\'s show you the key features. Click Next to start!',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: ShieldCheck,
  },
  {
    id: 'jobs-search',
    title: 'Finding the Right Jobs',
    description: 'Type anything in the search bar to filter jobs instantly.',
    route: '/jobs',
    target: '.search-and-filters',
    placement: 'bottom',
    duration: 6000,
    icon: Search,
  },
  {
    id: 'jobs-actions',
    title: 'Managing Your Jobs',
    description: 'Click the three-dot menu (⋮) to view, edit, or mark jobs as "Working".',
    route: '/jobs',
    target: '.jobs-table-actions',
    placement: 'left',
    duration: 6000,
    icon: Briefcase,
  },
  {
    id: 'submit-button',
    title: 'Adding New Candidates',
    description: 'Click "Submit Candidate" to add candidates manually or with AI resume parsing.',
    route: '/candidates',
    target: '.submit-candidate-button',
    placement: 'left',
    duration: 5000,
    icon: UserPlus,
  },
  {
    id: 'resume-upload',
    title: 'AI-Powered Resume Parsing',
    description: 'Upload a resume (PDF, DOCX) and watch AI auto-fill all candidate details.',
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
    description: 'Hover over any status badge to see what each pipeline stage means.',
    route: '/candidates',
    target: '.candidate-stage-column',
    placement: 'right',
    duration: 6000,
    icon: ListChecks,
  },
  {
    id: 'complete',
    title: 'You\'re All Set!',
    description: 'Start adding candidates and managing your recruitment pipeline.',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: CheckCircle,
  },
];
