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
    title: '🤖 Level 4: You\'re Ready to Scale MASSIVELY!',
    description: 'You\'ve proven yourself—placements are coming! Now here\'s how 6-figure recruiters operate: They automate outreach and let AI work 24/7. You\'re about to join their ranks!',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: Send,
  },
  {
    id: 'outreach-agent',
    title: '💬 Reach 10x More = Earn 10x More',
    description: 'Meet your AI outreach assistant! While you manage your pipeline, it engages hundreds of candidates automatically. Set it up now—this is how pros scale income!',
    route: '/outreach-agent',
    target: null,
    placement: 'center',
    duration: 7000,
    icon: Bot,
  },
  {
    id: 'candidate-sourcing',
    title: '🔍 Build Pipeline While You Sleep',
    description: 'Let AI find top candidates from LinkedIn and job boards 24/7. Wake up to new opportunities daily! This is passive income building—automate it right now!',
    route: '/sourcing-agent',
    target: null,
    placement: 'center',
    duration: 7000,
    icon: Users,
  },
  {
    id: 'personalized-messages',
    title: '✉️ AI Writes, You Earn',
    description: 'AI crafts personalized messages that get 3x better responses. More engaged candidates = faster placements = bigger commissions. Let AI do the heavy lifting!',
    route: '/outreach-agent',
    target: null,
    placement: 'center',
    duration: 6000,
    icon: MessageSquare,
  },
  {
    id: 'automated-follow-ups',
    title: '⏰ Follow-Ups = 80% of Placements',
    description: 'Here\'s a secret: Most placements need 2-3 follow-ups. Automate them and never lose a deal again! Set it once, earn forever. Smart recruiters always follow up!',
    route: '/outreach-agent',
    target: null,
    placement: 'center',
    duration: 6000,
    icon: Zap,
  },
  {
    id: 'level4-complete',
    title: '⚡ PHENOMENAL! You\'re Scaling Like an Elite!',
    description: '🏆 You\'ve unlocked massive potential:\n✅ 10x outreach with AI automation\n✅ 24/7 candidate sourcing\n✅ 3x better response rates\n✅ Never miss follow-ups = Never miss deals\n\n👑 FINAL LEVEL BECKONS: The elite 1% of recruiters use data analytics to optimize EVERYTHING and earn $100K+ annually! Get 3+ placements OR 25+ submissions to unlock Power User status and join the top earners!',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: CheckCircle,
  },
];
