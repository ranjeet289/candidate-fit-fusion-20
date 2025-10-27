import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTourContext } from '@/context/TourContext';
import { Sparkles, Play, BookOpen } from 'lucide-react';

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { hasSeenTour, startTour, skipTour } = useTourContext();

  useEffect(() => {
    if (!hasSeenTour) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [hasSeenTour]);

  const handleStartAuto = () => {
    setIsOpen(false);
    startTour('auto');
  };

  const handleStartManual = () => {
    setIsOpen(false);
    startTour('manual');
  };

  const handleSkip = () => {
    setIsOpen(false);
    skipTour();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <DialogTitle className="text-2xl">Welcome to Synapse Recruitment AI! 👋</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            Let us show you around in just 2 minutes and discover how AI can revolutionize your recruitment process.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          <Button
            size="lg"
            className="w-full justify-between text-lg h-auto py-4"
            onClick={handleStartAuto}
          >
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              <span>Take Quick Tour (Auto)</span>
            </div>
            <Badge variant="secondary">2 min</Badge>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full justify-start text-lg h-auto py-4"
            onClick={handleStartManual}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            <span>Guide Me Step-by-Step</span>
          </Button>

          <Button
            variant="ghost"
            className="w-full"
            onClick={handleSkip}
          >
            I'll Explore on My Own
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
