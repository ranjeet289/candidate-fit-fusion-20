import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Check } from 'lucide-react';
import WelcomeStep from '@/components/onboarding/steps/WelcomeStep';
import PersonalInfoStep from '@/components/onboarding/steps/PersonalInfoStep';
import RecruiterProfileStep from '@/components/onboarding/steps/RecruiterProfileStep';
import PreferencesStep from '@/components/onboarding/steps/PreferencesStep';
import CompleteStep from '@/components/onboarding/steps/CompleteStep';

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-14 w-14 rounded-xl bg-primary flex items-center justify-center">
              <Brain className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Synapse
          </h1>
          <p className="text-muted-foreground">
            Let's set up your profile in just a few steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    currentStep > step.id
                      ? 'bg-primary border-primary text-primary-foreground'
                      : currentStep === step.id
                      ? 'border-primary text-primary bg-background'
                      : 'border-muted text-muted-foreground bg-background'
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </div>
                <span className="text-xs mt-2 text-muted-foreground hidden md:block">
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 md:w-24 h-0.5 mx-2 transition-all ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Content Card */}
        <Card className="p-8">
          {currentStep === 1 && (
            <WelcomeStep onNext={handleNext} />
          )}
          {currentStep === 2 && (
            <PersonalInfoStep onNext={handleNext} onPrevious={handlePrevious} formData={formData} />
          )}
          {currentStep === 3 && (
            <RecruiterProfileStep onNext={handleNext} onPrevious={handlePrevious} formData={formData} />
          )}
          {currentStep === 4 && (
            <PreferencesStep onNext={handleNext} onPrevious={handlePrevious} formData={formData} />
          )}
          {currentStep === 5 && (
            <CompleteStep onComplete={handleComplete} formData={formData} />
          )}
        </Card>

        {/* Skip Button */}
        {currentStep < steps.length && (
          <div className="text-center mt-4">
            <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
              Skip for now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
