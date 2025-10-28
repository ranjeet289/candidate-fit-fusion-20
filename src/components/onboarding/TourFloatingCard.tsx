import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TourProgressDots } from './TourProgressDots';
import { X, GripVertical } from 'lucide-react';

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
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentPosition(position);
  }, [position]);

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

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = {
        left: e.clientX - dragOffset.x,
        top: e.clientY - dragOffset.y,
      };
      setCurrentPosition(newPosition);
      onPositionChange?.(newPosition);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, onPositionChange]);

  return (
    <Card
      ref={cardRef}
      className={`fixed z-[100] max-w-sm bg-gradient-to-br from-card to-card/95 border-2 border-primary/60 rounded-xl p-7 
                  shadow-[0_20px_50px_rgba(124,58,237,0.3)] backdrop-blur-sm animate-scale-in
                  ${isDragging ? 'cursor-grabbing' : ''}`}
      style={{
        top: currentPosition.top !== undefined ? `${currentPosition.top}px` : undefined,
        left: currentPosition.left !== undefined ? `${currentPosition.left}px` : undefined,
        bottom: currentPosition.bottom !== undefined ? `${currentPosition.bottom}px` : undefined,
        right: currentPosition.right !== undefined ? `${currentPosition.right}px` : undefined,
        userSelect: isDragging ? 'none' : 'auto',
      }}
    >
      {/* Draggable header area */}
      <div 
        className="absolute top-0 left-0 right-0 h-12 cursor-grab active:cursor-grabbing rounded-t-xl"
        onMouseDown={handleMouseDown}
      >
        <div className="absolute top-3 left-3 text-muted-foreground pointer-events-none">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      <button
        onClick={onSkip}
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground 
                   transition-colors z-10 hover:bg-muted/50 rounded p-1"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-center justify-between mb-4 mt-2">
        <TourProgressDots currentStep={currentStep} totalSteps={totalSteps} />
        <span className="text-xs text-muted-foreground font-medium">
          Step {currentStep + 1} of {totalSteps}
        </span>
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

      <div className="flex items-center justify-between gap-2 pt-2">
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
