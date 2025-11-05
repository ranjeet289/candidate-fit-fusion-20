import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCompletedLevels, markLevelCompleted, getHighestAvailableLevel } from '@/lib/tour-events';

type TourMode = 'auto' | 'manual';

interface TourContextType {
  isTourActive: boolean;
  currentStep: number;
  tourMode: TourMode;
  hasSeenTour: boolean;
  currentTourLevel: number;
  completedLevels: number[];
  highestAvailableLevel: number;
  startTour: (mode: TourMode) => void;
  startLevelTour: (level: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTour: () => void;
  completeTour: () => void;
  restartTour: () => void;
  completeAllTours: () => void;
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
  const [currentTourLevel, setCurrentTourLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [highestAvailableLevel, setHighestAvailableLevel] = useState(1);
  const [tourTriggeredSheet, setTourTriggeredSheet] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Dynamic total steps based on current level
  const levelStepCounts: Record<number, number> = {
    1: 8,  // Level 1: Getting Started
    2: 6,  // Level 2: Maximizing Value
    3: 6,  // Level 3: Pipeline Mastery
    4: 6,  // Level 4: Outreach & Engagement
    5: 6,  // Level 5: Power User
  };
  const totalSteps = levelStepCounts[currentTourLevel] || 8;

  useEffect(() => {
    // PROTOTYPE MODE: Auto-complete all tours on first load
    const prototypeAutoComplete = localStorage.getItem('synapse_prototype_autocomplete');
    
    if (prototypeAutoComplete !== 'done') {
      // First time loading - auto complete all tours
      for (let level = 1; level <= 5; level++) {
        markLevelCompleted(level);
      }
      localStorage.setItem('synapse_prototype_autocomplete', 'done');
      localStorage.setItem('synapse_tour_completed', 'true');
    }
    
    // Load completed levels (will now include all 5)
    const completed = getCompletedLevels();
    setCompletedLevels(completed);
    
    // Load highest available level (will be 5)
    const highest = getHighestAvailableLevel();
    setHighestAvailableLevel(highest);
    
    // Mark tour as seen
    setHasSeenTour(true);
  }, []);

  const startTour = (mode: TourMode) => {
    setTourMode(mode);
    setCurrentStep(0);
    setCurrentTourLevel(1);
    setIsTourActive(true);
    localStorage.setItem('synapse_tour_mode', mode);
    localStorage.setItem('synapse_tour_last_step', '0');
    localStorage.setItem('synapse_current_tour_level', '1');
    navigate('/');
  };

  const startLevelTour = (level: number) => {
    if (level > highestAvailableLevel) {
      console.warn(`Level ${level} is not yet available`);
      return;
    }
    
    setTourMode('manual');
    setCurrentStep(0);
    setCurrentTourLevel(level);
    setIsTourActive(true);
    localStorage.setItem('synapse_tour_mode', 'manual');
    localStorage.setItem('synapse_tour_last_step', '0');
    localStorage.setItem('synapse_current_tour_level', String(level));
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
    
    // Mark current level as completed
    markLevelCompleted(currentTourLevel);
    const updated = getCompletedLevels();
    setCompletedLevels(updated);
    
    // Update highest available level
    const highest = getHighestAvailableLevel();
    setHighestAvailableLevel(highest);
    
    localStorage.setItem('synapse_tour_completed', 'true');
    localStorage.setItem('synapse_tour_skipped', 'false');
    setHasSeenTour(true);
  };

  const restartTour = () => {
    localStorage.removeItem('synapse_tour_completed');
    localStorage.removeItem('synapse_tour_skipped');
    setHasSeenTour(false);
    setCurrentStep(0);
    setCurrentTourLevel(1);
    setIsTourActive(true);
    setTourMode('manual');
    localStorage.setItem('synapse_current_tour_level', '1');
    navigate('/');
  };

  const completeAllTours = () => {
    // Mark all levels 1-5 as completed
    for (let level = 1; level <= 5; level++) {
      markLevelCompleted(level);
    }
    
    // Update state
    const updated = getCompletedLevels();
    setCompletedLevels(updated);
    setHighestAvailableLevel(5);
    
    // Set tour as seen
    localStorage.setItem('synapse_tour_completed', 'true');
    setHasSeenTour(true);
    
    // Close any active tour
    setIsTourActive(false);
  };

  return (
    <TourContext.Provider
      value={{
        isTourActive,
        currentStep,
        tourMode,
        hasSeenTour,
        currentTourLevel,
        completedLevels,
        highestAvailableLevel,
        startTour,
        startLevelTour,
        nextStep,
        prevStep,
        skipTour,
        completeTour,
        restartTour,
        completeAllTours,
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
