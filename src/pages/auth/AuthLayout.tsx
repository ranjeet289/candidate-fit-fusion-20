import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Brain } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side: Form */}
      <div className="flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
                <Brain className="h-7 w-7 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
          
          <div className="mt-8">
            {children}
          </div>
        </div>
      </div>

      {/* Right side: Branding */}
      <div className="hidden lg:flex bg-gradient-to-br from-primary via-primary/90 to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative flex items-center justify-center w-full p-12">
          <div className="max-w-lg text-white space-y-6">
            <h2 className="text-4xl font-bold">
              Welcome to Synapse Recruitment AI
            </h2>
            <p className="text-lg text-white/90">
              Transform your recruitment process with AI-powered candidate sourcing, 
              intelligent matching, and automated outreach.
            </p>
            <div className="space-y-4 pt-8">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Smart Sourcing</h3>
                  <p className="text-white/80 text-sm">
                    AI agents find the perfect candidates across multiple platforms
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Intelligent Matching</h3>
                  <p className="text-white/80 text-sm">
                    Advanced algorithms match candidates to roles with precision
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Automated Outreach</h3>
                  <p className="text-white/80 text-sm">
                    Personalized communication at scale with AI-powered engagement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
