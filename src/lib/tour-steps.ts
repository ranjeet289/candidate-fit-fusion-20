import { Star, BarChart2, Target, Send, MessageSquare, CheckCircle } from 'lucide-react';

export interface TourStep {
  id: string;
  title: string;
  description: string;
  route: string;
  target: string | null;
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center';
  duration: number;
  icon: any;
}

export const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Synapse!',
    description: 'AI-powered recruitment platform that automates sourcing, matching, and outreach.',
    route: '/',
    target: '.agent-cards-container',
    placement: 'bottom',
    duration: 4000,
    icon: Star,
  },
  {
    id: 'overview',
    title: 'Your Command Center',
    description: 'Track active jobs, candidates, pipeline status, and recruiter performance in real-time.',
    route: '/overview',
    target: '.stats-cards-container',
    placement: 'bottom',
    duration: 5000,
    icon: BarChart2,
  },
  {
    id: 'sourcing',
    title: 'AI Sourcing Agent',
    description: 'Let AI find perfect candidates across multiple platforms using advanced matching algorithms.',
    route: '/sourcing-agent',
    target: '.job-selector',
    placement: 'right',
    duration: 5000,
    icon: Target,
  },
  {
    id: 'recommendation',
    title: 'Smart Recommendations',
    description: 'AI matches candidates to jobs based on skills, experience, and fit scores.',
    route: '/recommendation-agent',
    target: '.candidate-selector',
    placement: 'right',
    duration: 5000,
    icon: Send,
  },
  {
    id: 'outreach',
    title: 'Automated Outreach',
    description: 'Personalize and automate candidate engagement with AI-generated messages.',
    route: '/outreach-agent',
    target: '.automation-toggle',
    placement: 'left',
    duration: 5000,
    icon: MessageSquare,
  },
  {
    id: 'complete',
    title: 'You\'re All Set!',
    description: 'Ready to revolutionize your recruitment. Start by creating a job or exploring AI agents.',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: CheckCircle,
  },
];
