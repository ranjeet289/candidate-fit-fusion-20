import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import { Bell, HelpCircle, RotateCcw, BookOpen, ExternalLink } from 'lucide-react';
import Index from './pages/Index';
import Overview from './pages/Overview';
import Jobs from './pages/Jobs';
import Candidates from './pages/Candidates';
import Users from './pages/Users';
import SourcingAgent from './pages/SourcingAgent';
import OutreachAgent from './pages/OutreachAgent';
import RecommendationAgent from './pages/RecommendationAgent';
import ATSSearch from './pages/ATSSearch';
import AIAgentsOverview from './pages/AIAgentsOverview';
import NotFound from './pages/NotFound';
import { EntityProvider } from './context/EntityContext';
import { PageTitleProvider, usePageTitle } from './hooks/use-page-title';
import { Toaster } from './components/ui/toaster';
import { TourProvider, useTourContext } from './context/TourContext';
import { TourOrchestrator } from './components/onboarding/TourOrchestrator';
import { WelcomeModal } from './components/onboarding/WelcomeModal';
import { TourBanner } from './components/onboarding/TourBanner';
import { LevelUnlockBanner } from './components/onboarding/LevelUnlockBanner';
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import CheckEmail from './pages/auth/CheckEmail';
import ResetPassword from './pages/auth/ResetPassword';
import Onboarding from './pages/auth/Onboarding';
import Profile from './pages/Profile';
import UserMenu from './components/layout/UserMenu';

function App() {
  return (
    <EntityProvider>
      <PageTitleProvider>
        <Router>
          <TourProvider>
            <AuthProvider>
              <Routes>
              {/* Auth Routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              <Route path="/auth/check-email" element={<CheckEmail />} />
              <Route path="/auth/reset-password" element={<ResetPassword />} />
              <Route path="/auth/onboarding" element={<Onboarding />} />

              {/* Protected Routes */}
              <Route path="/*" element={
                <ProtectedRoute>
                  <SidebarProvider>
                      <div className="flex min-h-screen bg-white w-full">
                        <AppSidebar />
                        <main className="flex-1 overflow-auto">
                          <HeaderWithTitle />
                          <TourBanner />
                          <div className="flex-1">
                            <Routes>
                              <Route path="/" element={<Index />} />
                              <Route path="/overview" element={<Overview />} />
                              <Route path="/jobs" element={<Jobs />} />
                              <Route path="/candidates" element={<Candidates />} />
                              <Route path="/ats-search" element={<ATSSearch />} />
                              <Route path="/users" element={<Users />} />
                              <Route path="/sourcing-agent" element={<SourcingAgent />} />
                              <Route path="/outreach-agent" element={<OutreachAgent />} />
                              <Route path="/recommendation-agent" element={<RecommendationAgent />} />
                              <Route path="/profile" element={<Profile />} />
                              <Route path="*" element={<NotFound />} />
                            </Routes>
                          </div>
                        </main>
                      </div>
                      <Toaster />
                      <WelcomeModal />
                      <TourOrchestrator />
                      <LevelUnlockBanner />
                    </SidebarProvider>
                </ProtectedRoute>
              } />
              </Routes>
            </AuthProvider>
          </TourProvider>
        </Router>
      </PageTitleProvider>
    </EntityProvider>
  );
}

function HeaderWithTitle() {
  const { title, icon, badge } = usePageTitle();
  const { restartTour } = useTourContext();
  
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        {icon}
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        {badge}
      </div>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <button className="p-2 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="space-y-2">
              <button
                onClick={restartTour}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Restart Tour
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors">
                <BookOpen className="w-4 h-4" />
                Quick Tips
              </button>
              <a
                href="https://docs.lovable.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Help Center
              </a>
            </div>
          </PopoverContent>
        </Popover>
        <button className="p-2 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <UserMenu />
      </div>
    </div>
  );
}

export default App;
