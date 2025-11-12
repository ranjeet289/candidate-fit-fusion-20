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
    title: '📊 Level 3: You\'re Becoming an Elite Recruiter!',
    description: 'Your pipeline is growing—that\'s EXACTLY how successful recruiters operate! Now let\'s organize it so every candidate moves toward "Placed" (and you get PAID). You\'re crushing it!',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: GitBranch,
  },
  {
    id: 'pipeline-stages',
    title: '💸 Each Stage = You\'re Closer to Money',
    description: 'Master this: Submitted → Screening → Interview (70% closer!) → Offer (90% closer!) → Placed = PAID! Track every candidate\'s journey. Winners manage, not just submit!',
    route: '/candidates',
    target: null,
    placement: 'center',
    duration: 7000,
    icon: Activity,
  },
  {
    id: 'advanced-filters',
    title: '🎯 Filter = Focus = Income',
    description: 'Use filters to instantly see candidates in "Interview" or "Offer" stages—these are your HOTTEST leads! Smart recruiters focus where money is closest. Do it now!',
    route: '/candidates',
    target: null,
    placement: 'center',
    duration: 6000,
    icon: Filter,
  },
  {
    id: 'candidate-profile',
    title: '📁 Deep Dive = Better Decisions',
    description: 'Click any candidate to see everything: full profile, interview dates, submission history. Elite recruiters know their pipeline inside-out. You\'re one of them now!',
    route: '/candidates',
    target: null,
    placement: 'center',
    duration: 6000,
    icon: Calendar,
  },
  {
    id: 'activity-feed',
    title: '🔔 Never Miss a Money Moment',
    description: 'Real-time updates mean you catch every interview, status change, and opportunity the SECOND it happens. Speed = Wins = Commissions. Stay on top!',
    route: '/',
    target: null,
    placement: 'center',
    duration: 5000,
    icon: Bell,
  },
  {
    id: 'level3-complete',
    title: '🎯 OUTSTANDING! You\'re Managing Like a Pro!',
    description: '🏆 Your achievements are incredible:\n✅ Pipeline stages mastered\n✅ Smart filtering for ROI\n✅ Never missing opportunities\n✅ Candidates organized perfectly\n\n🤖 LEVEL 4 IS CALLING: Ready to 10x your reach? Top recruiters use AI automation to engage hundreds of candidates while they sleep! Get your first placement OR 10+ submissions to unlock Automation Mastery and scale your income exponentially!',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: CheckCircle,
  },
];
