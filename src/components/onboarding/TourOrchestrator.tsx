import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTourContext } from '@/context/TourContext';
import { level1Steps } from '@/lib/tour-levels/level1-steps';
import { level2Steps } from '@/lib/tour-levels/level2-steps';
import { level3Steps } from '@/lib/tour-levels/level3-steps';
import { level4Steps } from '@/lib/tour-levels/level4-steps';
import { level5Steps } from '@/lib/tour-levels/level5-steps';
import { TourFloatingCard } from './TourFloatingCard';

export function TourOrchestrator() {
  const { 
    isTourActive, 
    currentStep,
    currentTourLevel,
    tourMode, 
    nextStep, 
    prevStep, 
    skipTour: contextSkipTour, 
    setTourTriggeredSheet 
  } = useTourContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [cardPosition, setCardPosition] = useState({ top: 100, left: 100 });
  const [draggedPosition, setDraggedPosition] = useState<{ top: number; left: number } | null>(null);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  // Get tour steps based on current level
  const levelStepsMap: Record<number, any[]> = {
    1: level1Steps,
    2: level2Steps,
    3: level3Steps,
    4: level4Steps,
    5: level5Steps,
  };
  
  const tourSteps = levelStepsMap[currentTourLevel] || level1Steps;
  const currentTourStep = tourSteps[currentStep];

  // Wrapper function with cleanup
  const skipTour = () => {
    // Clean up any highlighted elements
    const highlightedElements = document.querySelectorAll('.tour-highlight');
    highlightedElements.forEach(el => el.classList.remove('tour-highlight'));
    
    // Clear tour-triggered sheet
    setTourTriggeredSheet(null);
    
    // Call the context's skipTour
    contextSkipTour();
  };

  // Navigate to the correct route for the current step
  useEffect(() => {
    if (isTourActive && currentTourStep) {
      if (location.pathname !== currentTourStep.route) {
        navigate(currentTourStep.route);
      }
      
      // Trigger auto-open sheet if specified
      if (currentTourStep.autoOpenSheet) {
        setTimeout(() => {
          setTourTriggeredSheet(currentTourStep.autoOpenSheet!);
        }, 500);
      } else {
        setTourTriggeredSheet(null);
      }
    }
  }, [isTourActive, currentStep, currentTourStep, navigate, location.pathname, setTourTriggeredSheet]);

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

  const finalPosition = draggedPosition || cardPosition;

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
    <>
      <div className="tour-backdrop" />
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
        position={finalPosition}
        onPositionChange={setDraggedPosition}
      />
    </>
  );
}
