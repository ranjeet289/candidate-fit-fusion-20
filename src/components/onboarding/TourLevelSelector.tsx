import { useTourContext } from '@/context/TourContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getLevelInfo } from '@/lib/tour-events';
import { Lock, CheckCircle, Play } from 'lucide-react';

export function TourLevelSelector() {
  const { 
    completedLevels, 
    highestAvailableLevel, 
    startLevelTour,
    currentTourLevel,
    isTourActive 
  } = useTourContext();

  const levels = [1, 2, 3, 4, 5];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {levels.map((level) => {
        const info = getLevelInfo(level);
        const isCompleted = completedLevels.includes(level);
        const isAvailable = level <= highestAvailableLevel;
        const isCurrent = level === currentTourLevel && isTourActive;
        const isLocked = !isAvailable;

        return (
          <Card 
            key={level} 
            className={`p-4 transition-all ${
              isCurrent 
                ? 'border-primary shadow-lg scale-105' 
                : isCompleted 
                ? 'border-green-500/50' 
                : isLocked
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:shadow-md'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold
                  ${isCurrent ? 'bg-primary text-primary-foreground' : 
                    isCompleted ? 'bg-green-500 text-white' : 
                    isLocked ? 'bg-muted text-muted-foreground' : 
                    'bg-secondary text-secondary-foreground'}
                `}>
                  {level}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Level {level}</h3>
                  <p className="text-xs text-muted-foreground">{info.title}</p>
                </div>
              </div>
              
              {isCompleted && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              {isLocked && (
                <Lock className="w-5 h-5 text-muted-foreground" />
              )}
              {isCurrent && (
                <div className="animate-pulse">
                  <Play className="w-5 h-5 text-primary" />
                </div>
              )}
            </div>

            <p className="text-xs text-muted-foreground mb-3">
              {info.description}
            </p>

            <Button
              size="sm"
              variant={isCurrent ? "default" : isCompleted ? "outline" : "secondary"}
              className="w-full"
              disabled={isLocked}
              onClick={() => startLevelTour(level)}
            >
              {isCurrent ? 'Continue Tour' : 
               isCompleted ? 'Review Again' : 
               isLocked ? 'Locked' : 
               'Start Level'}
            </Button>
          </Card>
        );
      })}
    </div>
  );
}
