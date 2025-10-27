
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import { Bell, Search, Settings } from 'lucide-react';
import Index from './pages/Index';
import Overview from './pages/Overview';
import Jobs from './pages/Jobs';
import Candidates from './pages/Candidates';
import Users from './pages/Users';
import SourcingAgent from './pages/SourcingAgent';
import OutreachAgent from './pages/OutreachAgent';
import RecommendationAgent from './pages/RecommendationAgent';
import ATSSearch from './pages/ATSSearch';
import AIRecruiter from './pages/AIRecruiter';
import AIAgentsOverview from './pages/AIAgentsOverview';
import NotFound from './pages/NotFound';
import { EntityProvider } from './context/EntityContext';
import { PageTitleProvider, usePageTitle } from './hooks/use-page-title';
import { Toaster } from './components/ui/toaster';
import { TourProvider } from './context/TourContext';
import { TourOrchestrator } from './components/onboarding/TourOrchestrator';
import { WelcomeModal } from './components/onboarding/WelcomeModal';
import { TourBanner } from './components/onboarding/TourBanner';
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover';
import { HelpCircle, RotateCcw, BookOpen, ExternalLink } from 'lucide-react';
import { useTourContext } from './context/TourContext';

function App() {
  console.log('App.tsx: App component rendering');
  return (
    <EntityProvider>
      <PageTitleProvider>
        <Router>
          <TourProvider>
            <SidebarProvider>
              <div className="flex min-h-screen bg-white w-full">
                <AppSidebar />
                <main className="flex-1 overflow-auto">
                  {/* Top header with page title and notification icons */}
                  <HeaderWithTitle />
                  <TourBanner />
                  
                  {/* Page content */}
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
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </main>
              </div>
              <Toaster />
              <WelcomeModal />
              <TourOrchestrator />
            </SidebarProvider>
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
        <button className="p-2 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center ml-2">
          <span className="text-white text-sm font-medium">U</span>
        </div>
      </div>
    </div>
  );
}

export default App;
