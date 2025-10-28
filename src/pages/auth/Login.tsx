import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AuthLayout from './AuthLayout';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth/onboarding');
  };

  return (
    <AuthLayout 
      title="Welcome to Synapse" 
      subtitle="Transform your recruitment process with AI-powered intelligence"
    >
      <div className="space-y-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mx-auto animate-scale-in">
          <Sparkles className="h-10 w-10 text-primary animate-pulse" />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground">
            Ready to Get Started?
          </h3>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Let's set up your profile in just a few steps and unlock the full power of AI recruitment.
          </p>
        </div>

        <Button 
          onClick={handleGetStarted} 
          size="lg" 
          className="w-full group"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </AuthLayout>
  );
}
