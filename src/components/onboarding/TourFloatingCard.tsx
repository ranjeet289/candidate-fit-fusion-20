import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TourProgressDots } from './TourProgressDots';
import { X, GripVertical } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import ConfettiExplosion from 'react-confetti-explosion';

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
  onPositionChange?: (position: { top: number; left: number }) => void;
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
  onPositionChange,
}: TourFloatingCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState(position);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentPosition(position);
  }, [position]);

  // Confetti on last step
  useEffect(() => {
    if (isLastStep && currentStep === totalSteps - 1) {
      setShowConfetti(true);
    }
  }, [isLastStep, currentStep, totalSteps]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowSkipConfirm(true);
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        onNext();
      } else if (e.key === 'ArrowLeft' && canGoPrev) {
        e.preventDefault();
        onPrev();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, canGoPrev]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't start drag if clicking on a button or interactive element
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    
    const touch = e.touches[0];
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cardWidth = cardRef.current?.offsetWidth || 400;
      const cardHeight = cardRef.current?.offsetHeight || 300;
      
      const newPosition = {
        left: Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - cardWidth)),
        top: Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - cardHeight)),
      };
      setCurrentPosition(newPosition);
      onPositionChange?.(newPosition);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const cardWidth = cardRef.current?.offsetWidth || 400;
      const cardHeight = cardRef.current?.offsetHeight || 300;
      
      const newPosition = {
        left: Math.max(0, Math.min(touch.clientX - dragOffset.x, window.innerWidth - cardWidth)),
        top: Math.max(0, Math.min(touch.clientY - dragOffset.y, window.innerHeight - cardHeight)),
      };
      setCurrentPosition(newPosition);
      onPositionChange?.(newPosition);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragOffset, onPositionChange]);

  return (
    <>
      {showConfetti && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101]">
          <ConfettiExplosion
            particleCount={100}
            width={1200}
            colors={['#7c3aed', '#a855f7', '#c084fc']}
          />
        </div>
      )}
      <Card
        ref={cardRef}
        role="dialog"
        aria-label="Product tour"
        aria-describedby="tour-description"
        aria-live="polite"
        tabIndex={-1}
        className={`
          fixed z-[100] w-[90vw] sm:w-auto sm:max-w-sm md:max-w-md
          bg-gradient-to-br from-card via-card to-card/95 
          border-2 border-primary/60 rounded-2xl 
          p-4 sm:p-6 md:p-7
          shadow-[0_20px_50px_rgba(124,58,237,0.3),0_0_0_1px_rgba(124,58,237,0.1)]
          backdrop-blur-md
          animate-slide-bounce
          transition-all duration-300
          hover:shadow-[0_25px_60px_rgba(124,58,237,0.4)]
          ${isDragging ? 'cursor-grabbing scale-105' : 'cursor-default'}
        `}
        style={{
          top: currentPosition.top !== undefined ? `${currentPosition.top}px` : undefined,
          left: currentPosition.left !== undefined ? `${currentPosition.left}px` : undefined,
          bottom: currentPosition.bottom !== undefined ? `${currentPosition.bottom}px` : undefined,
          right: currentPosition.right !== undefined ? `${currentPosition.right}px` : undefined,
          userSelect: isDragging ? 'none' : 'auto',
        }}
      >
        <div id="tour-description" className="sr-only">
          Step {currentStep + 1} of {totalSteps}: {title}
        </div>
        {/* Draggable header area */}
        <div 
          className="absolute top-0 left-0 right-0 h-12 cursor-grab active:cursor-grabbing rounded-t-xl"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="absolute top-3 left-3 text-muted-foreground pointer-events-none">
            <GripVertical className="w-4 h-4" />
          </div>
        </div>

        <AlertDialog open={showSkipConfirm} onOpenChange={setShowSkipConfirm}>
          <AlertDialogTrigger asChild>
            <button
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground 
                         transition-colors z-10 hover:bg-muted/50 rounded p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Skip this tour?</AlertDialogTitle>
              <AlertDialogDescription>
                You can always restart the tour from your profile settings.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Continue Tour</AlertDialogCancel>
              <AlertDialogAction onClick={onSkip}>
                Yes, Skip
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="space-y-2 mb-4 mt-2">
          <div className="flex items-center justify-between">
            <TourProgressDots currentStep={currentStep} totalSteps={totalSteps} />
            <span className="text-xs font-semibold text-primary">
              {Math.round(((currentStep + 1) / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

      <div className="flex items-start gap-3 mb-5">
        <div className="p-2.5 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1.5">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-2 pt-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowSkipConfirm(true)}
            className="w-full sm:w-auto"
          >
            Skip Tour
          </Button>
          <div className="flex gap-2 w-full sm:w-auto">
            {canGoPrev && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onPrev}
                className="flex-1 sm:flex-initial"
              >
                Back
              </Button>
            )}
            <Button 
              size="sm" 
              onClick={onNext}
              className="flex-1 sm:flex-initial relative overflow-hidden group"
            >
              <span className="relative z-10">{isLastStep ? 'Finish' : 'Next'}</span>
              <span className="absolute inset-0 bg-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground mt-2 text-center">
          Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">→</kbd> to continue
        </div>
      </Card>
    </>
  );
}
