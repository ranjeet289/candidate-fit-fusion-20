import { Button } from '@/components/ui/button';
import { Sparkles, Users, Target, TrendingUp } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="text-center space-y-10">
      <div className="space-y-4">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 mx-auto animate-scale-in">
          <Sparkles className="h-12 w-12 text-primary animate-pulse" />
        </div>
        <h2 className="text-4xl font-bold text-foreground">
          Welcome to the Future of Recruitment
        </h2>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          Let's get you set up with AI-powered tools that will transform how you recruit
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 text-left py-6">
        <div className="group p-6 rounded-xl border border-border bg-card hover:bg-accent/5 hover:border-primary/20 transition-all duration-300 space-y-4">
          <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-semibold text-lg text-foreground">AI-Powered Sourcing</h3>
          <p className="text-muted-foreground leading-relaxed">
            Discover perfect candidates across multiple platforms automatically
          </p>
        </div>

        <div className="group p-6 rounded-xl border border-border bg-card hover:bg-accent/5 hover:border-primary/20 transition-all duration-300 space-y-4">
          <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Target className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-semibold text-lg text-foreground">Smart Matching</h3>
          <p className="text-muted-foreground leading-relaxed">
            Advanced algorithms match candidates to roles with precision
          </p>
        </div>

        <div className="group p-6 rounded-xl border border-border bg-card hover:bg-accent/5 hover:border-primary/20 transition-all duration-300 space-y-4">
          <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Users className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-semibold text-lg text-foreground">Automated Outreach</h3>
          <p className="text-muted-foreground leading-relaxed">
            Personalized communication at scale with AI-powered engagement
          </p>
        </div>

        <div className="group p-6 rounded-xl border border-border bg-card hover:bg-accent/5 hover:border-primary/20 transition-all duration-300 space-y-4">
          <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
            <TrendingUp className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-semibold text-lg text-foreground">Performance Analytics</h3>
          <p className="text-muted-foreground leading-relaxed">
            Track your recruitment success with detailed insights
          </p>
        </div>
      </div>

      <Button onClick={onNext} size="lg" className="w-full md:w-auto px-16 py-6 text-lg group">
        Get Started
        <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
      </Button>
    </div>
  );
}
