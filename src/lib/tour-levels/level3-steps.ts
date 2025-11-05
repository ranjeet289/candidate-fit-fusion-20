import { GitBranch, Filter, Bell, Calendar, Activity, CheckCircle } from 'lucide-react';

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

// LEVEL 3: PIPELINE MASTERY - Managing Multiple Candidates & Stages
export const level3Steps: TourStep[] = [
  {
    id: 'level3-welcome',
    title: 'Level 3: Pipeline Mastery! 📊',
    description: 'You\'ve got submissions flowing! Now let\'s master managing your pipeline like a pro recruiter.',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: GitBranch,
  },
  {
    id: 'pipeline-stages',
    title: 'Understanding Pipeline Stages',
    description: 'Each candidate moves through stages: Submitted → Screening → Interview → Offer → Placed. Track them here!',
    route: '/candidates',
    target: '.candidate-stage-column',
    placement: 'right',
    duration: 7000,
    icon: Activity,
  },
  {
    id: 'advanced-filters',
    title: 'Filter by Stage & Job',
    description: 'Use filters to see candidates in specific stages or for specific jobs. Focus on what needs attention!',
    route: '/candidates',
    target: '.search-and-filters',
    placement: 'bottom',
    duration: 6000,
    icon: Filter,
  },
  {
    id: 'candidate-profile',
    title: 'Deep Dive into Profiles',
    description: 'Click any candidate to see their full profile, submission history, and interview schedule. Stay organized!',
    route: '/candidates',
    target: '.candidate-table-row',
    placement: 'left',
    duration: 6000,
    icon: Calendar,
  },
  {
    id: 'activity-feed',
    title: 'Monitor Activity Feed',
    description: 'See real-time updates on all candidate activities. Never miss an interview or status change!',
    route: '/',
    target: '.agent-activity-feed',
    placement: 'left',
    duration: 5000,
    icon: Bell,
  },
  {
    id: 'level3-complete',
    title: 'Level 3 Complete! 🎯',
    description: 'You\'re managing your pipeline like a pro! Get your first placement or 10+ submissions to unlock Level 4.',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: CheckCircle,
  },
];
