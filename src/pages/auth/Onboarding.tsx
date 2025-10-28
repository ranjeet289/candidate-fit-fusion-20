import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import WelcomeStep from '@/components/onboarding/steps/WelcomeStep';
import PersonalInfoStep from '@/components/onboarding/steps/PersonalInfoStep';
import RecruiterProfileStep from '@/components/onboarding/steps/RecruiterProfileStep';
import PreferencesStep from '@/components/onboarding/steps/PreferencesStep';
import CompleteStep from '@/components/onboarding/steps/CompleteStep';
import { ProgressBar } from '@/components/onboarding/ProgressBar';

const steps = [
  { id: 1, name: 'Welcome', component: WelcomeStep },
  { id: 2, name: 'Personal Info', component: PersonalInfoStep },
  { id: 3, name: 'Recruiter Profile', component: RecruiterProfileStep },
  { id: 4, name: 'Preferences', component: PreferencesStep },
  { id: 5, name: 'Complete', component: CompleteStep },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const handleNext = (data?: any) => {
    if (data) {
      setFormData(prev => ({ ...prev, ...data }));
    }
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    updateUser({ hasCompletedOnboarding: true });
    navigate('/');
  };

  const handleSkip = () => {
    updateUser({ hasCompletedOnboarding: true });
    navigate('/');
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-5xl space-y-10">
        {/* Progress Bar */}
        <div className="animate-fade-in">
          <ProgressBar currentStep={currentStep - 1} totalSteps={steps.length} />
        </div>

        {/* Step Content */}
        <Card className="shadow-2xl border-primary/10 backdrop-blur-sm animate-fade-in">
          <CardContent className="p-10 md:p-12">
            <CurrentStepComponent
              onNext={handleNext}
              onPrevious={handlePrevious}
              onComplete={handleComplete}
              formData={formData}
            />
          </CardContent>
        </Card>

        {/* Skip Button */}
        {currentStep < steps.length && (
          <div className="text-center animate-fade-in">
            <Button 
              variant="ghost" 
              onClick={handleSkip} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip for now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
