interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percentage = Math.round(((currentStep + 1) / totalSteps) * 100);
  
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground font-medium">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-primary font-semibold">
          {percentage}% Complete
        </span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
