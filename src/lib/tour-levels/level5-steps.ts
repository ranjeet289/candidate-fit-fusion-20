import { TrendingUp, PieChart, Target, Sparkles, Crown, CheckCircle } from 'lucide-react';

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

// LEVEL 5: POWER USER - Analytics, Optimization, Advanced Features
export const level5Steps: TourStep[] = [
  {
    id: 'level5-welcome',
    title: 'Level 5: Power User Status! 👑',
    description: 'You\'re a Synapse expert! Now let\'s optimize your performance with advanced analytics and insights.',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: Crown,
  },
  {
    id: 'analytics-overview',
    title: 'Your Performance Dashboard',
    description: 'See your submission-to-placement rate, top-performing jobs, and earnings projections. Data-driven success!',
    route: '/',
    target: '.agent-stats-card',
    placement: 'bottom',
    duration: 7000,
    icon: PieChart,
  },
  {
    id: 'feedback-analytics',
    title: 'Learn from Feedback',
    description: 'Analyze client feedback to understand what makes candidates successful. Improve your fit scores!',
    route: '/',
    target: '.feedback-analytics',
    placement: 'right',
    duration: 6000,
    icon: TrendingUp,
  },
  {
    id: 'fit-score-optimization',
    title: 'Master Fit Score Analysis',
    description: 'See detailed breakdowns of what makes a great fit. Use this to pre-qualify candidates before submission!',
    route: '/candidates',
    target: '.fit-score-breakdown',
    placement: 'left',
    duration: 7000,
    icon: Target,
  },
  {
    id: 'ai-agents-overview',
    title: 'Explore All AI Agents',
    description: 'Discover the full suite of AI agents: Sourcing, Recommendation, Outreach. Use them together for maximum results!',
    route: '/ai-agents',
    target: '.ai-agents-grid',
    placement: 'top',
    duration: 6000,
    icon: Sparkles,
  },
  {
    id: 'level5-complete',
    title: 'Congratulations, Power User! 🏆',
    description: 'You\'ve mastered Synapse! Keep placing candidates and watch your success grow. You\'re unstoppable!',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: Crown,
  },
];
