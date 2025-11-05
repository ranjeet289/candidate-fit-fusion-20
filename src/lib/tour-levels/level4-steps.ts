import { Send, MessageSquare, Zap, Users, Bot, CheckCircle } from 'lucide-react';

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

// LEVEL 4: OUTREACH & ENGAGEMENT - Proactive Candidate Engagement
export const level4Steps: TourStep[] = [
  {
    id: 'level4-welcome',
    title: 'Level 4: Outreach & Engagement! 💬',
    description: 'Congratulations on your success! Now let\'s scale with automated outreach and engagement tools.',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: Send,
  },
  {
    id: 'outreach-agent',
    title: 'Meet the Outreach Agent',
    description: 'AI-powered outreach to engage passive candidates. Reach 10x more candidates with personalized messages!',
    route: '/outreach-agent',
    target: null,
    placement: 'center',
    duration: 7000,
    icon: Bot,
  },
  {
    id: 'candidate-sourcing',
    title: 'Auto-Source Candidates',
    description: 'Let AI find candidates from LinkedIn, job boards, and databases. Build your pipeline on autopilot!',
    route: '/sourcing-agent',
    target: null,
    placement: 'center',
    duration: 7000,
    icon: Users,
  },
  {
    id: 'personalized-messages',
    title: 'Craft Personalized Outreach',
    description: 'AI generates custom messages for each candidate based on their profile and target job. High response rates!',
    route: '/outreach-agent',
    target: null,
    placement: 'center',
    duration: 6000,
    icon: MessageSquare,
  },
  {
    id: 'automated-follow-ups',
    title: 'Set Up Follow-Up Sequences',
    description: 'Schedule automated follow-ups for candidates who don\'t respond. Stay top of mind without manual work!',
    route: '/outreach-agent',
    target: null,
    placement: 'center',
    duration: 6000,
    icon: Zap,
  },
  {
    id: 'level4-complete',
    title: 'Level 4 Complete! ⚡',
    description: 'You\'re now scaling with automation! Get 3+ placements or 25+ submissions to unlock Level 5 - Power User!',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: CheckCircle,
  },
];
