import { Sparkles, Search, Briefcase, UserPlus, Upload, ListChecks, CheckCircle, FileText, Activity } from 'lucide-react';

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
    title: '🚀 Your Success Journey Starts Here!',
    description: 'You\'re about to join thousands of recruiters earning $2K-$10K per placement! Let\'s get your first candidate submitted together. Ready? Click Next!',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: Sparkles,
  },
  {
    id: 'jobs-search',
    title: '💼 Find Your Money-Making Opportunities',
    description: 'Start typing to discover high-paying roles! Every job you find is a potential $5K+ commission. Pro tip: Top recruiters search daily to stay ahead!',
    route: '/jobs',
    target: '.search-and-filters',
    placement: 'bottom',
    duration: 5000,
    icon: Search,
  },
  {
    id: 'jobs-actions',
    title: '⭐ Mark Your Favorites (Smart Move!)',
    description: 'See those three dots (⋮)? Click them! Mark jobs as "Working" so you can focus on your highest-earning opportunities. Winners prioritize!',
    route: '/jobs',
    target: '.jobs-table-actions',
    placement: 'left',
    duration: 5000,
    icon: Briefcase,
  },
  {
    id: 'submit-button',
    title: '💰 This Button = Your First Commission!',
    description: 'Click "Submit Candidate" right now! This simple action starts your earning journey. You\'re seconds away from your first submission!',
    route: '/candidates',
    target: '.submit-candidate-button',
    placement: 'left',
    duration: 6000,
    icon: UserPlus,
  },
  {
    id: 'resume-upload',
    title: '⚡ Watch AI Work Its Magic',
    description: 'Upload any resume and watch it auto-fill in 30 seconds! (Saves 5+ minutes = submit 3x more candidates daily). Smart recruiters LOVE this feature!',
    route: '/candidates',
    target: '.resume-upload-area',
    placement: 'right',
    duration: 7000,
    icon: Upload,
    autoOpenSheet: 'submitCandidate',
  },
  {
    id: 'complete-submission',
    title: '🎯 Almost There - Finish Strong!',
    description: 'You\'re SO close! Fill in the job, add your notes, and hit Submit. This moment launches your recruiting success. You\'ve got this!',
    route: '/candidates',
    target: '.submit-form-actions',
    placement: 'top',
    duration: 8000,
    icon: FileText,
  },
  {
    id: 'candidate-status',
    title: '📊 Track Your Path to Payment',
    description: 'See those status badges? Each stage brings you closer to "Placed" = Commission earned! Hover to learn what each means. Knowledge = Power!',
    route: '/candidates',
    target: '.candidate-stage-column',
    placement: 'right',
    duration: 5000,
    icon: Activity,
  },
  {
    id: 'level1-complete',
    title: '🎉 AMAZING! You\'re Officially a Synapse Recruiter!',
    description: '🏆 What you just accomplished:\n✅ Learned job search like a pro\n✅ Mastered AI resume parsing\n✅ Ready to submit your first candidate!\n\n💎 NEXT LEVEL UNLOCKED: Learn how top recruiters 3x their income by submitting to multiple jobs! Complete your first submission to start Level 2 and multiply your earning potential!',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: CheckCircle,
  },
];
