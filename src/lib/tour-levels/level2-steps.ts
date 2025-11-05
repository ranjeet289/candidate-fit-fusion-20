import { Target, Sparkles, TrendingUp, BarChart3, CheckCircle } from 'lucide-react';

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

// LEVEL 2: MAXIMIZING VALUE - Submit to Multiple Roles + Add More Candidates
export const level2Steps: TourStep[] = [
  {
    id: 'level2-welcome',
    title: 'Level 2: Maximizing Value! 💰',
    description: 'Great job on your first submission! Now let\'s multiply your chances of placements by submitting strategically.',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: Target,
  },
  {
    id: 'smart-matches',
    title: 'Discover Smart Matches',
    description: 'AI automatically suggests the best job matches for your candidates. Click here to see AI-powered recommendations!',
    route: '/recommendation-agent',
    target: null,
    placement: 'center',
    duration: 6000,
    icon: Sparkles,
  },
  {
    id: 'multi-job-submit',
    title: 'Submit to Multiple Jobs',
    description: 'Select your candidate and submit them to 3-5 matching roles at once. More submissions = higher placement odds!',
    route: '/recommendation-agent',
    target: null,
    placement: 'center',
    duration: 7000,
    icon: Target,
  },
  {
    id: 'add-second-candidate',
    title: 'Build Your Pipeline',
    description: 'Add your second candidate! The more quality candidates you submit, the more placements you\'ll earn.',
    route: '/candidates',
    target: null,
    placement: 'center',
    duration: 6000,
    icon: TrendingUp,
  },
  {
    id: 'submission-history',
    title: 'Track Your Submissions',
    description: 'View all your submissions here. Monitor which ones are progressing and which need follow-up.',
    route: '/recommendation-agent',
    target: null,
    placement: 'center',
    duration: 5000,
    icon: BarChart3,
  },
  {
    id: 'level2-complete',
    title: 'Level 2 Complete! 🚀',
    description: 'You\'re building momentum! Submit 3+ candidates to unlock Level 3 and master pipeline management.',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: CheckCircle,
  },
];
