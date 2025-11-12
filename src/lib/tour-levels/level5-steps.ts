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
    title: '👑 Level 5: Welcome to the Elite Circle!',
    description: 'You\'re consistently earning—congratulations! Now let\'s use analytics to optimize everything and maximize your income. This is how top 1% recruiters think. You\'ve earned this!',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: Crown,
  },
  {
    id: 'analytics-overview',
    title: '📊 Data = Dollars (Track Everything!)',
    description: 'See your exact submission-to-placement rate, highest-earning jobs, and monthly projections. Knowledge is money—use these insights to double your placement rate!',
    route: '/',
    target: null,
    placement: 'center',
    duration: 7000,
    icon: PieChart,
  },
  {
    id: 'feedback-analytics',
    title: '💡 Learn = Earn More',
    description: 'Analyze which candidate types get placed fastest. Find your "winning formula" and 2x your commissions by doing more of what works. Elite recruiters optimize constantly!',
    route: '/',
    target: null,
    placement: 'center',
    duration: 6000,
    icon: TrendingUp,
  },
  {
    id: 'fit-score-optimization',
    title: '🎯 Master Fit Scores = 3x Close Rate',
    description: 'Candidates with 90+ fit scores place 3x faster! Learn what drives high scores and pre-qualify before submitting. This ONE skill can transform your income!',
    route: '/candidates',
    target: null,
    placement: 'center',
    duration: 7000,
    icon: Target,
  },
  {
    id: 'ai-agents-overview',
    title: '🚀 Stack All Tools = Maximum Power',
    description: 'Use Sourcing + Recommendation + Outreach + Analytics together! Top earners use all 4 to 10x their monthly income. You have everything you need right here!',
    route: '/ai-agents',
    target: null,
    placement: 'center',
    duration: 6000,
    icon: Sparkles,
  },
  {
    id: 'level5-complete',
    title: '🏆 LEGENDARY! You\'re a Certified Synapse Master!',
    description: '👑 Your transformation is complete:\n✅ AI automation expert\n✅ Data-driven optimizer\n✅ Pipeline management pro\n✅ Elite income potential unlocked\n\n💰 YOU\'VE JOINED THE TOP 1%: You have every tool, skill, and strategy used by 6-figure recruiters. Your earning potential is now UNLIMITED. Keep placing candidates, keep optimizing, and watch your monthly commissions grow exponentially!\n\n🎉 You\'re not just using Synapse—you\'re MASTERING the recruiting game. Congratulations, legend!',
    route: '/',
    target: null,
    placement: 'center',
    duration: 0,
    icon: Crown,
  },
];
