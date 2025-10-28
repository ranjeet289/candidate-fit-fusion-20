import { Button } from '@/components/ui/button';
import { CheckCircle2, Sparkles, Target, Users, TrendingUp } from 'lucide-react';

interface CompleteStepProps {
  onComplete: () => void;
  formData: any;
}

export default function CompleteStep({ onComplete, formData }: CompleteStepProps) {
  return (
    <div className="text-center space-y-10 py-6">
      <div className="flex justify-center animate-scale-in">
        <div className="h-28 w-28 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center">
          <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400 animate-pulse" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-foreground">
          You're All Set!
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your profile is complete and you're ready to start recruiting smarter with AI
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
        <div className="p-5 border rounded-xl bg-card hover:bg-accent/5 transition-colors space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground">Take the Tour</h4>
          </div>
          <p className="text-sm text-muted-foreground pl-13">
            Learn about key features and capabilities
          </p>
        </div>

        <div className="p-5 border rounded-xl bg-card hover:bg-accent/5 transition-colors space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground">Create Job Posts</h4>
          </div>
          <p className="text-sm text-muted-foreground pl-13">
            Start by adding your first job opening
          </p>
        </div>

        <div className="p-5 border rounded-xl bg-card hover:bg-accent/5 transition-colors space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground">AI Sourcing</h4>
          </div>
          <p className="text-sm text-muted-foreground pl-13">
            Let AI agents find perfect candidates for you
          </p>
        </div>

        <div className="p-5 border rounded-xl bg-card hover:bg-accent/5 transition-colors space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground">Smart Matches</h4>
          </div>
          <p className="text-sm text-muted-foreground pl-13">
            Review matches and start reaching out
          </p>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <Button onClick={onComplete} size="lg" className="px-16 py-6 text-lg group">
          Start Recruiting
          <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
        </Button>
        <p className="text-sm text-muted-foreground">
          You can update your preferences anytime in Settings
        </p>
      </div>
    </div>
  );
}
