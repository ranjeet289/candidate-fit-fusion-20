// Tour Event System - Tracks key user actions to unlock tour levels

export type TourEventType = 
  | 'first_submission_completed'
  | 'second_submission_completed'
  | 'third_submission_completed'
  | 'tenth_submission_completed'
  | 'twenty_fifth_submission_completed'
  | 'first_placement'
  | 'third_placement'
  | 'candidate_viewed'
  | 'job_viewed'
  | 'resume_uploaded'
  | 'smart_match_used'
  | 'outreach_sent';

export interface TourEvent {
  type: TourEventType;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface TourLevelCriteria {
  level: number;
  unlockEvents: TourEventType[];
  requiresAll?: boolean; // If true, all events required. If false (default), any event unlocks
  minCount?: number; // Minimum count of specific event type
}

// Define unlock criteria for each level
export const levelUnlockCriteria: TourLevelCriteria[] = [
  {
    level: 1,
    unlockEvents: [], // Level 1 is always unlocked
  },
  {
    level: 2,
    unlockEvents: ['first_submission_completed'],
    minCount: 1,
  },
  {
    level: 3,
    unlockEvents: ['third_submission_completed'],
    minCount: 1,
  },
  {
    level: 4,
    unlockEvents: ['first_placement', 'tenth_submission_completed'],
    requiresAll: false, // Either first placement OR 10 submissions
  },
  {
    level: 5,
    unlockEvents: ['third_placement', 'twenty_fifth_submission_completed'],
    requiresAll: false, // Either 3 placements OR 25 submissions
  },
];

// Local storage keys
const TOUR_EVENTS_KEY = 'synapse_tour_events';
const TOUR_LEVELS_KEY = 'synapse_tour_levels';

// Get all recorded events
export function getTourEvents(): TourEvent[] {
  const stored = localStorage.getItem(TOUR_EVENTS_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Record a new tour event
export function recordTourEvent(type: TourEventType, metadata?: Record<string, any>) {
  const events = getTourEvents();
  const newEvent: TourEvent = {
    type,
    timestamp: Date.now(),
    metadata,
  };
  
  events.push(newEvent);
  localStorage.setItem(TOUR_EVENTS_KEY, JSON.stringify(events));
  
  // Check if this event unlocks a new level
  const newLevel = checkLevelUnlock(events);
  if (newLevel) {
    return newLevel;
  }
  
  return null;
}

// Check if events unlock a new level
export function checkLevelUnlock(events: TourEvent[]): number | null {
  const completedLevels = getCompletedLevels();
  const currentMaxLevel = Math.max(1, ...completedLevels);
  const nextLevel = currentMaxLevel + 1;
  
  if (nextLevel > 5) return null; // Max level reached
  
  const criteria = levelUnlockCriteria.find(c => c.level === nextLevel);
  if (!criteria) return null;
  
  // Level 1 is always unlocked
  if (criteria.level === 1) return null;
  
  // Check if criteria is met
  if (criteria.requiresAll) {
    // All events must be present
    const hasAll = criteria.unlockEvents.every(eventType => 
      events.some(e => e.type === eventType)
    );
    if (hasAll) {
      return nextLevel;
    }
  } else {
    // Any event unlocks
    const hasAny = criteria.unlockEvents.some(eventType => {
      if (criteria.minCount) {
        const count = events.filter(e => e.type === eventType).length;
        return count >= criteria.minCount;
      }
      return events.some(e => e.type === eventType);
    });
    if (hasAny) {
      return nextLevel;
    }
  }
  
  return null;
}

// Get completed tour levels
export function getCompletedLevels(): number[] {
  const stored = localStorage.getItem(TOUR_LEVELS_KEY);
  return stored ? JSON.parse(stored) : [1]; // Level 1 always available
}

// Mark a level as completed
export function markLevelCompleted(level: number) {
  const completed = getCompletedLevels();
  if (!completed.includes(level)) {
    completed.push(level);
    localStorage.setItem(TOUR_LEVELS_KEY, JSON.stringify(completed));
  }
}

// Get highest available level (completed or unlocked)
export function getHighestAvailableLevel(): number {
  const events = getTourEvents();
  const completed = getCompletedLevels();
  
  // Check for newly unlocked level
  for (let level = 1; level <= 5; level++) {
    if (!completed.includes(level)) {
      const criteria = levelUnlockCriteria.find(c => c.level === level);
      if (criteria && criteria.unlockEvents.length === 0) {
        // Level 1 always available
        return level;
      }
      
      if (criteria) {
        if (criteria.requiresAll) {
          const hasAll = criteria.unlockEvents.every(eventType => 
            events.some(e => e.type === eventType)
          );
          if (hasAll) {
            return level;
          }
        } else {
          const hasAny = criteria.unlockEvents.some(eventType => {
            if (criteria.minCount) {
              const count = events.filter(e => e.type === eventType).length;
              return count >= criteria.minCount;
            }
            return events.some(e => e.type === eventType);
          });
          if (hasAny) {
            return level;
          }
        }
      }
      
      // If this level isn't unlocked, stop checking higher levels
      return level - 1;
    }
  }
  
  return Math.max(...completed);
}

// Get level title and description
export function getLevelInfo(level: number): { title: string; description: string } {
  const levels = {
    1: { 
      title: 'Getting Started', 
      description: 'Learn the basics and make your first submission' 
    },
    2: { 
      title: 'Maximizing Value', 
      description: 'Submit to multiple roles and build your pipeline' 
    },
    3: { 
      title: 'Pipeline Mastery', 
      description: 'Master managing candidates through all stages' 
    },
    4: { 
      title: 'Outreach & Engagement', 
      description: 'Scale with AI-powered outreach and automation' 
    },
    5: { 
      title: 'Power User', 
      description: 'Optimize with analytics and advanced features' 
    },
  };
  
  return levels[level as keyof typeof levels] || levels[1];
}
