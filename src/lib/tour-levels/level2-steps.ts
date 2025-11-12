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
    title: '💎 Level 2: You\'re Ready to Multiply Your Income!',
    description: 'Incredible work on Level 1! Now here\'s the secret top earners use: One candidate × 5 jobs = 5x the commission opportunities. Let\'s do this together!',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: Target,
  },
  {
    id: 'smart-matches',
    title: '🤖 Let AI Find Money For You',
    description: 'Click here and watch AI instantly suggest the BEST job matches! This one feature helps recruiters double their placement rate. Try it now—you\'ll love it!',
    route: '/recommendation-agent',
    target: null,
    placement: 'center',
    duration: 6000,
    icon: Sparkles,
  },
  {
    id: 'multi-job-submit',
    title: '🚀 The 5x Strategy (Game-Changer!)',
    description: 'Here\'s what pros do: Submit one candidate to 3-5 matching jobs at once. Math = Simple: 5 submissions = 5x higher odds of earning that $5K+ commission. Do it!',
    route: '/recommendation-agent',
    target: null,
    placement: 'center',
    duration: 7000,
    icon: Target,
  },
  {
    id: 'add-second-candidate',
    title: '💰 Double Your Pipeline = Double Your Income',
    description: 'You\'ve got one candidate—amazing! Now add a second and you\'re building REAL earning momentum. Each quality candidate = another revenue stream. Keep going!',
    route: '/candidates',
    target: null,
    placement: 'center',
    duration: 6000,
    icon: TrendingUp,
  },
  {
    id: 'submission-history',
    title: '📈 Your Success Dashboard',
    description: 'View all submissions here and see your growing pipeline! Track which candidates are heating up and which need attention. You\'re building something great!',
    route: '/recommendation-agent',
    target: null,
    placement: 'center',
    duration: 5000,
    icon: BarChart3,
  },
  {
    id: 'level2-complete',
    title: '🔥 BRILLIANT! You\'re Building Serious Momentum!',
    description: '🏆 Look at what you\'ve mastered:\n✅ AI-powered job matching\n✅ Multi-job submission strategy (5x technique!)\n✅ Pipeline building like a pro\n\n📊 LEVEL 3 AWAITS: You\'re ready to manage your pipeline like elite recruiters who close 50+ placements/year! Submit 3+ candidates to unlock Pipeline Mastery and learn how to never miss a money-making opportunity!',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: CheckCircle,
  },
];
