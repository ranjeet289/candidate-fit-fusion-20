import { Rocket, Gem, TrendingUp, Bot, Crown, LucideIcon } from "lucide-react";

export interface AchievementBadge {
  id: string;
  level: number;
  name: string;
  description: string;
  icon: LucideIcon;
  colors: {
    primary: string;
    secondary: string;
    glow: string;
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  points: number;
}

export const ACHIEVEMENT_BADGES: AchievementBadge[] = [
  {
    id: 'first-steps',
    level: 1,
    name: '🚀 First Steps',
    description: 'Started your earning journey! Learned job search and submission basics.',
    icon: Rocket,
    colors: { 
      primary: 'hsl(142, 76%, 36%)', 
      secondary: 'hsl(142, 71%, 45%)', 
      glow: 'hsla(142, 76%, 36%, 0.4)' 
    },
    rarity: 'common',
    points: 100,
  },
  {
    id: 'income-multiplier',
    level: 2,
    name: '💎 Income Multiplier',
    description: 'Mastered multi-job submissions! 3-5x your earning potential.',
    icon: Gem,
    colors: { 
      primary: 'hsl(217, 91%, 60%)', 
      secondary: 'hsl(221, 83%, 53%)', 
      glow: 'hsla(217, 91%, 60%, 0.4)' 
    },
    rarity: 'rare',
    points: 250,
  },
  {
    id: 'pipeline-master',
    level: 3,
    name: '📊 Pipeline Master',
    description: 'Elite pipeline management! Track candidates like a pro.',
    icon: TrendingUp,
    colors: { 
      primary: 'hsl(258, 90%, 66%)', 
      secondary: 'hsl(262, 83%, 58%)', 
      glow: 'hsla(258, 90%, 66%, 0.4)' 
    },
    rarity: 'epic',
    points: 500,
  },
  {
    id: 'automation-expert',
    level: 4,
    name: '🤖 Automation Expert',
    description: 'AI-powered outreach unlocked! Scale your income exponentially.',
    icon: Bot,
    colors: { 
      primary: 'hsl(38, 92%, 50%)', 
      secondary: 'hsl(32, 95%, 44%)', 
      glow: 'hsla(38, 92%, 50%, 0.4)' 
    },
    rarity: 'legendary',
    points: 1000,
  },
  {
    id: 'synapse-legend',
    level: 5,
    name: '👑 Synapse Legend',
    description: 'Elite Power User! Join the top 1% of recruiters earning $100K+ annually.',
    icon: Crown,
    colors: { 
      primary: 'hsl(330, 81%, 60%)', 
      secondary: 'hsl(336, 84%, 55%)', 
      glow: 'hsla(330, 81%, 60%, 0.4)' 
    },
    rarity: 'mythic',
    points: 2500,
  },
];

// Local storage key for badge unlocks
const BADGE_UNLOCKS_KEY = 'synapse_badge_unlocks';

interface BadgeUnlock {
  level: number;
  unlockedAt: number;
}

// Get badge for a specific level
export function getBadgeForLevel(level: number): AchievementBadge | undefined {
  return ACHIEVEMENT_BADGES.find(badge => badge.level === level);
}

// Get all earned badges based on completed levels
export function getEarnedBadges(completedLevels: number[]): AchievementBadge[] {
  return ACHIEVEMENT_BADGES.filter(badge => completedLevels.includes(badge.level));
}

// Save badge unlock timestamp
export function saveBadgeUnlockTimestamp(level: number): void {
  const unlocks = getBadgeUnlocks();
  if (!unlocks.find(u => u.level === level)) {
    unlocks.push({ level, unlockedAt: Date.now() });
    localStorage.setItem(BADGE_UNLOCKS_KEY, JSON.stringify(unlocks));
  }
}

// Get all badge unlocks from storage
export function getBadgeUnlocks(): BadgeUnlock[] {
  const stored = localStorage.getItem(BADGE_UNLOCKS_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Get unlock date for a specific level
export function getBadgeUnlockDate(level: number): Date | null {
  const unlocks = getBadgeUnlocks();
  const unlock = unlocks.find(u => u.level === level);
  return unlock ? new Date(unlock.unlockedAt) : null;
}

// Calculate total badge score
export function calculateBadgeScore(badges: AchievementBadge[]): number {
  return badges.reduce((total, badge) => total + badge.points, 0);
}

// Check if a badge was recently unlocked (within last 30 seconds)
export function hasRecentlyUnlockedBadge(): boolean {
  const unlocks = getBadgeUnlocks();
  const thirtySecondsAgo = Date.now() - 30000;
  return unlocks.some(unlock => unlock.unlockedAt > thirtySecondsAgo);
}
