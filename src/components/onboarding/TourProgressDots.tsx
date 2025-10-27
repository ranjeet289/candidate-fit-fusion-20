interface TourProgressDotsProps {
  currentStep: number;
  totalSteps: number;
}

export function TourProgressDots({ currentStep, totalSteps }: TourProgressDotsProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            index === currentStep
              ? 'bg-primary w-3 h-3'
              : index < currentStep
              ? 'bg-green-500'
              : 'bg-muted'
          }`}
        />
      ))}
    </div>
  );
}
