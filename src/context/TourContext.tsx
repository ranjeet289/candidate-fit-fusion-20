import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type TourMode = 'auto' | 'manual';

interface TourContextType {
  isTourActive: boolean;
  currentStep: number;
  tourMode: TourMode;
  hasSeenTour: boolean;
  startTour: (mode: TourMode) => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTour: () => void;
  restartTour: () => void;
  totalSteps: number;
  tourTriggeredSheet: string | null;
  setTourTriggeredSheet: (sheet: string | null) => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export function TourProvider({ children }: { children: ReactNode }) {
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tourMode, setTourMode] = useState<TourMode>('auto');
  const [hasSeenTour, setHasSeenTour] = useState(false);
  const [tourTriggeredSheet, setTourTriggeredSheet] = useState<string | null>(null);
  const navigate = useNavigate();
  const totalSteps = 7;

  useEffect(() => {
    const completed = localStorage.getItem('synapse_tour_completed');
    if (completed === 'true') {
      setHasSeenTour(true);
    }
  }, []);

  const startTour = (mode: TourMode) => {
    setTourMode(mode);
    setCurrentStep(0);
    setIsTourActive(true);
    localStorage.setItem('synapse_tour_mode', mode);
    localStorage.setItem('synapse_tour_last_step', '0');
    navigate('/');
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      const nextStepNum = currentStep + 1;
      setCurrentStep(nextStepNum);
      localStorage.setItem('synapse_tour_last_step', String(nextStepNum));
    } else {
      // Tour complete
      completeTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const prevStepNum = currentStep - 1;
      setCurrentStep(prevStepNum);
      localStorage.setItem('synapse_tour_last_step', String(prevStepNum));
    }
  };

  const skipTour = () => {
    setIsTourActive(false);
    localStorage.setItem('synapse_tour_completed', 'true');
    localStorage.setItem('synapse_tour_skipped', 'true');
    setHasSeenTour(true);
  };

  const completeTour = () => {
    setIsTourActive(false);
    localStorage.setItem('synapse_tour_completed', 'true');
    localStorage.setItem('synapse_tour_skipped', 'false');
    setHasSeenTour(true);
  };

  const restartTour = () => {
    localStorage.removeItem('synapse_tour_completed');
    localStorage.removeItem('synapse_tour_skipped');
    setHasSeenTour(false);
    setCurrentStep(0);
    setIsTourActive(true);
    setTourMode('manual');
    navigate('/');
  };

  return (
    <TourContext.Provider
      value={{
        isTourActive,
        currentStep,
        tourMode,
        hasSeenTour,
        startTour,
        nextStep,
        prevStep,
        skipTour,
        restartTour,
        totalSteps,
        tourTriggeredSheet,
        setTourTriggeredSheet,
      }}
    >
      {children}
    </TourContext.Provider>
  );
}

export function useTourContext() {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTourContext must be used within a TourProvider');
  }
  return context;
}
