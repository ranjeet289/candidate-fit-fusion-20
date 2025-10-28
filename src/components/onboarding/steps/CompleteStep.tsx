import { Button } from '@/components/ui/button';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface CompleteStepProps {
  onComplete: () => void;
  formData: any;
}

export default function CompleteStep({ onComplete, formData }: CompleteStepProps) {
  return (
    <div className="text-center space-y-8 py-8">
      <div className="flex justify-center">
        <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
          <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-foreground">
          You're All Set!
        </h2>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Your profile is complete and you're ready to start recruiting smarter with AI
        </p>
      </div>

      <div className="bg-muted/50 rounded-lg p-6 max-w-md mx-auto text-left space-y-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          What's next?
        </h3>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-semibold mt-0.5">1.</span>
            <span>Take the product tour to learn about key features</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-semibold mt-0.5">2.</span>
            <span>Create your first job posting</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-semibold mt-0.5">3.</span>
            <span>Let our AI agents start sourcing candidates for you</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-semibold mt-0.5">4.</span>
            <span>Review smart matches and start reaching out</span>
          </li>
        </ul>
      </div>

      <div className="space-y-3 pt-4">
        <Button onClick={onComplete} size="lg" className="w-full md:w-auto px-12">
          Start Recruiting
        </Button>
        <p className="text-sm text-muted-foreground">
          You can change your preferences anytime in Settings
        </p>
      </div>
    </div>
  );
}
