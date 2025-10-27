import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TourProgressDots } from './TourProgressDots';
import { X } from 'lucide-react';

interface TourFloatingCardProps {
  title: string;
  description: string;
  currentStep: number;
  totalSteps: number;
  icon: any;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  canGoPrev: boolean;
  isLastStep: boolean;
  position: { top?: number; left?: number; bottom?: number; right?: number };
}

export function TourFloatingCard({
  title,
  description,
  currentStep,
  totalSteps,
  icon: Icon,
  onNext,
  onPrev,
  onSkip,
  canGoPrev,
  isLastStep,
  position,
}: TourFloatingCardProps) {
  return (
    <Card
      className="fixed z-[100] max-w-sm bg-card border-primary/20 shadow-2xl animate-fade-in p-6"
      style={{
        top: position.top ? `${position.top}px` : undefined,
        left: position.left ? `${position.left}px` : undefined,
        bottom: position.bottom ? `${position.bottom}px` : undefined,
        right: position.right ? `${position.right}px` : undefined,
      }}
    >
      <button
        onClick={onSkip}
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-center justify-between mb-4">
        <TourProgressDots currentStep={currentStep} totalSteps={totalSteps} />
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>

      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <Button variant="ghost" size="sm" onClick={onSkip}>
          Skip Tour
        </Button>
        <div className="flex gap-2">
          {canGoPrev && (
            <Button variant="outline" size="sm" onClick={onPrev}>
              Back
            </Button>
          )}
          <Button size="sm" onClick={onNext}>
            {isLastStep ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
