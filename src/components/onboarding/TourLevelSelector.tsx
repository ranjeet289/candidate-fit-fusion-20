import { useTourContext } from '@/context/TourContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getLevelInfo } from '@/lib/tour-events';
import { Lock, CheckCircle, Play } from 'lucide-react';

function getUnlockCriteriaText(level: number): string {
  const criteria = {
    1: 'Always available - Starting point for all users',
    2: 'Normally unlocks after: First candidate submission',
    3: 'Normally unlocks after: 3 candidate submissions',
    4: 'Normally unlocks after: First placement OR 10 submissions',
    5: 'Normally unlocks after: 3 placements OR 25 submissions',
  };
  return criteria[level as keyof typeof criteria] || '';
}

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
        // PROTOTYPE MODE: All levels unlocked
        const isAvailable = true;
        const isCurrent = level === currentTourLevel && isTourActive;
        const isLocked = false;

        return (
          <TooltipProvider key={level}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card 
                  className={`p-4 transition-all cursor-help ${
                    isCurrent 
                      ? 'border-primary shadow-lg scale-105' 
                      : isCompleted 
                      ? 'border-green-500/50' 
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
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    Level {level}
                    {level > 1 && !isCompleted && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded">
                        PROTO
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-muted-foreground">{info.title}</p>
                </div>
              </div>
              
              {isCompleted && (
                <CheckCircle className="w-5 h-5 text-green-500" />
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
              onClick={() => startLevelTour(level)}
            >
              {isCurrent ? 'Continue Tour' : 
               isCompleted ? 'Review Again' : 
               'Start Level'}
            </Button>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-sm">
          <div className="space-y-1">
            <p className="text-sm font-semibold">{info.title}</p>
            <p className="text-xs text-muted-foreground">{getUnlockCriteriaText(level)}</p>
            {level > 1 && (
              <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-2">
                ✨ All levels unlocked for prototype
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
        );
      })}
    </div>
  );
}
