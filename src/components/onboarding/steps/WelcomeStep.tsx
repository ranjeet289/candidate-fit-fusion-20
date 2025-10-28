import { Button } from '@/components/ui/button';
import { Sparkles, Users, Target, TrendingUp } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="text-center space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Welcome to the Future of Recruitment
        </h2>
        <p className="text-muted-foreground text-lg">
          Let's get you set up with AI-powered tools that will transform how you recruit
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 text-left py-8">
        <div className="space-y-3">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">AI-Powered Sourcing</h3>
          <p className="text-sm text-muted-foreground">
            Discover perfect candidates across multiple platforms automatically
          </p>
        </div>

        <div className="space-y-3">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">Smart Matching</h3>
          <p className="text-sm text-muted-foreground">
            Advanced algorithms match candidates to roles with precision
          </p>
        </div>

        <div className="space-y-3">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">Automated Outreach</h3>
          <p className="text-sm text-muted-foreground">
            Personalized communication at scale with AI-powered engagement
          </p>
        </div>

        <div className="space-y-3">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">Performance Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Track your recruitment success with detailed insights
          </p>
        </div>
      </div>

      <Button onClick={onNext} size="lg" className="w-full md:w-auto px-12">
        Get Started
      </Button>
    </div>
  );
}
