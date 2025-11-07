import { Check } from 'lucide-react';

interface TourProgressDotsProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

export function TourProgressDots({ 
  currentStep, 
  totalSteps,
  onStepClick 
}: TourProgressDotsProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <button
          key={index}
          onClick={() => index <= currentStep && onStepClick?.(index)}
          disabled={index > currentStep}
          className={`
            relative rounded-full transition-all duration-300
            ${index === currentStep ? 'w-3 h-3' : 'w-2 h-2'}
            ${index === currentStep ? 'bg-primary ring-4 ring-primary/20' : ''}
            ${index < currentStep ? 'bg-green-500 hover:scale-125 cursor-pointer' : ''}
            ${index > currentStep ? 'bg-muted cursor-not-allowed' : ''}
            ${index <= currentStep ? 'hover:scale-110' : ''}
          `}
          aria-label={`Step ${index + 1}${index === currentStep ? ' (current)' : index < currentStep ? ' (completed)' : ''}`}
        >
          {index < currentStep && (
            <Check className="w-2 h-2 absolute inset-0 m-auto text-white" />
          )}
        </button>
      ))}
    </div>
  );
}
