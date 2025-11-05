import { useEffect, useState } from 'react';
import { useTourEvents } from '@/hooks/useTourEvents';
import { useTourContext } from '@/context/TourContext';
import { Button } from '@/components/ui/button';
import { X, Trophy, Sparkles } from 'lucide-react';
import { getLevelInfo } from '@/lib/tour-events';

export function LevelUnlockBanner() {
  const { newLevelUnlocked, clearUnlockNotification } = useTourEvents();
  const { startLevelTour } = useTourContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (newLevelUnlocked) {
      setIsVisible(true);
    }
  }, [newLevelUnlocked]);

  if (!isVisible || !newLevelUnlocked) return null;

  const levelInfo = getLevelInfo(newLevelUnlocked);

  const handleStartTour = () => {
    startLevelTour(newLevelUnlocked);
    setIsVisible(false);
    clearUnlockNotification();
  };

  const handleDismiss = () => {
    setIsVisible(false);
    clearUnlockNotification();
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] animate-fade-in">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg shadow-2xl border border-primary-foreground/20 max-w-xl">
        <div className="p-4 flex items-start gap-4">
          <div className="flex-shrink-0 bg-primary-foreground/20 rounded-full p-3">
            <Trophy className="w-6 h-6" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold">Level {newLevelUnlocked} Unlocked!</h3>
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-sm opacity-90 mb-1">{levelInfo.title}</p>
            <p className="text-xs opacity-75">{levelInfo.description}</p>
            
            <div className="flex items-center gap-2 mt-3">
              <Button 
                size="sm" 
                variant="secondary"
                onClick={handleStartTour}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Start Level {newLevelUnlocked} Tour
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={handleDismiss}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                Maybe Later
              </Button>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 hover:bg-primary-foreground/10 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
