import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AuthLayout from './AuthLayout';
import { Mail, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function CheckEmail() {
  const email = localStorage.getItem('reset_email') || 'your email';

  const handleResend = () => {
    toast.success('Reset link sent! Check your email.');
  };

  return (
    <AuthLayout 
      title="Check your email" 
      subtitle="We've sent a password reset link"
    >
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-muted-foreground">
            We've sent a password reset link to
          </p>
          <p className="font-semibold text-foreground">
            {email}
          </p>
        </div>

        <div className="space-y-3 pt-4">
          <p className="text-sm text-muted-foreground">
            Didn't receive the email?
          </p>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleResend}
          >
            Resend email
          </Button>
        </div>

        <Link 
          to="/auth/login" 
          className="flex items-center justify-center text-sm font-medium text-primary hover:text-primary/80 transition-colors pt-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
