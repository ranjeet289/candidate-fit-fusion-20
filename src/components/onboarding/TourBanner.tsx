import { useState } from 'react';
import { useTourContext } from '@/context/TourContext';
import { Button } from '@/components/ui/button';
import { X, Sparkles } from 'lucide-react';

export function TourBanner() {
  const { hasSeenTour, isTourActive, startTour } = useTourContext();
  const [isDismissed, setIsDismissed] = useState(false);

  if (hasSeenTour || isTourActive || isDismissed) return null;

  return (
    <div className="bg-primary/10 border-b border-primary/20 px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-sm text-foreground">
            <strong>New to Synapse?</strong> Take a quick 2-minute tour to see what you can do →
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => startTour('auto')}>
            Start Tour
          </Button>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 hover:bg-primary/10 rounded transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
