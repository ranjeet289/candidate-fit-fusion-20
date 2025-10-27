import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTourContext } from '@/context/TourContext';
import { tourSteps } from '@/lib/tour-steps';
import { TourFloatingCard } from './TourFloatingCard';

export function TourOrchestrator() {
  const { isTourActive, currentStep, tourMode, nextStep, prevStep, skipTour } = useTourContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [cardPosition, setCardPosition] = useState({ top: 100, left: 100 });
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  const currentTourStep = tourSteps[currentStep];

  // Navigate to the correct route for the current step
  useEffect(() => {
    if (isTourActive && currentTourStep) {
      if (location.pathname !== currentTourStep.route) {
        navigate(currentTourStep.route);
      }
    }
  }, [isTourActive, currentStep, currentTourStep, navigate, location.pathname]);

  // Find and highlight target element
  useEffect(() => {
    if (!isTourActive || !currentTourStep?.target) {
      setTargetElement(null);
      return;
    }

    const timer = setTimeout(() => {
      const element = document.querySelector(currentTourStep.target!) as HTMLElement;
      if (element) {
        setTargetElement(element);
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Calculate card position based on target
        const rect = element.getBoundingClientRect();
        const placement = currentTourStep.placement;
        
        let position = { top: 100, left: 100 };
        
        if (placement === 'bottom') {
          position = {
            top: rect.bottom + 20,
            left: rect.left + rect.width / 2 - 180, // 180 = half card width
          };
        } else if (placement === 'right') {
          position = {
            top: rect.top,
            left: rect.right + 20,
          };
        } else if (placement === 'left') {
          position = {
            top: rect.top,
            left: rect.left - 380, // 380 = card width + gap
          };
        } else if (placement === 'top') {
          position = {
            top: rect.top - 300, // Approximate card height
            left: rect.left + rect.width / 2 - 180,
          };
        }
        
        setCardPosition(position);
      }
    }, 300); // Wait for navigation to complete

    return () => clearTimeout(timer);
  }, [isTourActive, currentStep, currentTourStep]);

  // Auto-advance in auto mode
  useEffect(() => {
    if (!isTourActive || tourMode !== 'auto' || !currentTourStep) return;
    
    if (currentTourStep.duration > 0 && currentStep < tourSteps.length - 1) {
      const timer = setTimeout(() => {
        nextStep();
      }, currentTourStep.duration);
      
      return () => clearTimeout(timer);
    }
  }, [isTourActive, tourMode, currentStep, currentTourStep, nextStep]);

  // Add highlight class to target element
  useEffect(() => {
    if (targetElement) {
      targetElement.classList.add('tour-highlight');
      return () => {
        targetElement.classList.remove('tour-highlight');
      };
    }
  }, [targetElement]);

  if (!isTourActive || !currentTourStep) return null;

  // Center modal for completion step
  if (currentTourStep.placement === 'center') {
    return (
      <div className="fixed inset-0 z-[99] flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <TourFloatingCard
          title={currentTourStep.title}
          description={currentTourStep.description}
          currentStep={currentStep}
          totalSteps={tourSteps.length}
          icon={currentTourStep.icon}
          onNext={nextStep}
          onPrev={prevStep}
          onSkip={skipTour}
          canGoPrev={currentStep > 0}
          isLastStep={currentStep === tourSteps.length - 1}
          position={{ top: 0, left: 0 }}
        />
      </div>
    );
  }

  return (
    <TourFloatingCard
      title={currentTourStep.title}
      description={currentTourStep.description}
      currentStep={currentStep}
      totalSteps={tourSteps.length}
      icon={currentTourStep.icon}
      onNext={nextStep}
      onPrev={prevStep}
      onSkip={skipTour}
      canGoPrev={currentStep > 0}
      isLastStep={currentStep === tourSteps.length - 1}
      position={cardPosition}
    />
  );
}
