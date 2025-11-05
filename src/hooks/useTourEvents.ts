import { useCallback, useEffect, useState } from 'react';
import { 
  recordTourEvent, 
  getTourEvents, 
  checkLevelUnlock,
  getHighestAvailableLevel,
  TourEventType 
} from '@/lib/tour-events';

export function useTourEvents() {
  const [newLevelUnlocked, setNewLevelUnlocked] = useState<number | null>(null);

  // Track an event and check for level unlocks
  const trackEvent = useCallback((eventType: TourEventType, metadata?: Record<string, any>) => {
    const newLevel = recordTourEvent(eventType, metadata);
    
    if (newLevel) {
      setNewLevelUnlocked(newLevel);
      
      // Auto-clear notification after 10 seconds
      setTimeout(() => {
        setNewLevelUnlocked(null);
      }, 10000);
    }
  }, []);

  // Clear the unlock notification
  const clearUnlockNotification = useCallback(() => {
    setNewLevelUnlocked(null);
  }, []);

  // Get all events
  const events = getTourEvents();

  // Get highest available level
  const highestAvailableLevel = getHighestAvailableLevel();

  return {
    trackEvent,
    newLevelUnlocked,
    clearUnlockNotification,
    events,
    highestAvailableLevel,
  };
}
