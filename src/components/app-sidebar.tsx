import { Users, Briefcase, BarChart3, Search, Target, Send, MessageSquare, Sparkles, Settings, LogOut, Calendar, Bell, FileText, HelpCircle, Bot, Zap, Grid3X3, CircleHelp, List, Activity, Home, Zap as ZapIcon, MessageCircle, Plane as PaperPlane, Folder, User, HelpCircle as Help, LifeBuoy, BarChart2, UserCheck, Ticket, UserPlus, FolderOpen, Users2, Settings2, Power, Trophy } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useTourContext } from "@/context/TourContext";
import { getBadgeForLevel, getEarnedBadges, getBadgeUnlockDate } from "@/lib/achievement-badges";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

// Premium badge for premium features
function PremiumBadge() {
  return (
    <span className="ml-2 bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded select-none flex items-center">
      Premium
    </span>
  );
}

// New badge with icon for new features
function NewBadge() {
  return (
    <span className="ml-auto flex items-center gap-1 bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded select-none">
      <Sparkles className="w-3.5 h-3.5" />
      New
    </span>
  );
}

export function AppSidebar() {
  const navigate = useNavigate();
  const { completedLevels } = useTourContext();
  const earnedBadges = getEarnedBadges(completedLevels);

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar w-64">
      <SidebarHeader className="p-4 bg-sidebar border-b border-sidebar-border space-y-3">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/c2c9d1f2-a8bc-4237-8753-bed9000d26fd.png" 
            alt="Synapse Logo" 
            className="w-8 h-8"
          />
          <span className="font-semibold text-sidebar-foreground">Synapse</span>
        </div>

        {/* Mini Trophy Case */}
        <TooltipProvider>
          <div className="p-3 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-sidebar-foreground">Achievements</span>
              </div>
              <span className="text-xs text-muted-foreground">{earnedBadges.length}/5</span>
            </div>
            
            <div className="flex items-center gap-1.5 justify-center">
              {[1, 2, 3, 4, 5].map((level) => {
                const badge = getBadgeForLevel(level);
                const isEarned = completedLevels.includes(level);
                
                if (!badge) return null;
                
                return (
                  <Tooltip key={level}>
                    <TooltipTrigger asChild>
                      <div 
                        className={cn(
                          "relative w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer",
                          isEarned 
                            ? "scale-100 hover:scale-110" 
                            : "opacity-40 scale-90 grayscale"
                        )}
                        style={isEarned ? {
                          background: `linear-gradient(135deg, ${badge.colors.primary}, ${badge.colors.secondary})`,
                          boxShadow: `0 4px 12px ${badge.colors.glow}`
                        } : {
                          backgroundColor: 'hsl(var(--muted))'
                        }}
                      >
                        <badge.icon className="w-4 h-4 text-white" />
                        {isEarned && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar" />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <div>
                        <p className="font-semibold">{badge.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                        {isEarned && getBadgeUnlockDate(level) && (
                          <p className="text-xs text-green-500 mt-1">
                            ✓ Unlocked {formatDistanceToNow(getBadgeUnlockDate(level)!, { addSuffix: true })}
                          </p>
                        )}
                        {!isEarned && (
                          <p className="text-xs text-muted-foreground mt-1">
                            🔒 Complete Level {level} Tour to unlock
                          </p>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
            
            {earnedBadges.length < 5 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-2 text-xs h-7 hover:bg-primary/10"
                onClick={() => navigate('/profile?tab=learning')}
              >
                View Progress
              </Button>
            )}
          </div>
        </TooltipProvider>
      </SidebarHeader>
      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground bg-sidebar">Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary data-[active=true]:bg-sidebar-accent data-[active=true]:text-primary">
                  <Link to="/overview">
                    <BarChart2 className="mr-2" size={18} />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {/* "AI Agents" are all premium, so "Premium" label next to header */}
          <SidebarGroupLabel className="text-muted-foreground bg-sidebar">
            <span className="flex items-center">
              AI Agents
              <PremiumBadge />
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary data-[active=true]:bg-sidebar-accent data-[active=true]:text-primary">
                  <Link to="/sourcing-agent">
                    <Target className="mr-2" size={18} />
                    <span>Sourcing Agent</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary data-[active=true]:bg-sidebar-accent data-[active=true]:text-primary">
                  <Link to="/outreach-agent">
                    <Send className="mr-2" size={18} />
                    <span>Outreach Agent</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary data-[active=true]:bg-sidebar-accent data-[active=true]:text-primary">
                  <Link to="/recommendation-agent">
                    <MessageSquare className="mr-2" size={18} />
                    <span>Recommendation Agent</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground bg-sidebar">Recruitment</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary data-[active=true]:bg-sidebar-accent data-[active=true]:text-primary">
                  <Link to="/jobs">
                    <Briefcase className="mr-2" size={18} />
                    <span>Jobs</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary data-[active=true]:bg-sidebar-accent data-[active=true]:text-primary">
                  <Link to="/candidates">
                    <Users className="mr-2" size={18} />
                    <span>Active Pipeline</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary data-[active=true]:bg-sidebar-accent data-[active=true]:text-primary">
                  <Link to="/ats-search">
                    <Search className="mr-2" size={18} />
                    <span>ATS Search</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary data-[active=true]:bg-sidebar-accent data-[active=true]:text-primary">
                  <Link to="/recruiters">
                    <UserCheck className="mr-2" size={18} />
                    <span>Recruiters</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary data-[active=true]:bg-sidebar-accent data-[active=true]:text-primary">
                  <Link to="/trackers">
                    <BarChart3 className="mr-2" size={18} />
                    <span>Trackers</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground bg-sidebar">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary data-[active=true]:bg-sidebar-accent data-[active=true]:text-primary">
                  <Link to="/tickets">
                    <Ticket className="mr-2" size={18} />
                    <span>Tickets</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary data-[active=true]:bg-sidebar-accent data-[active=true]:text-primary">
                  <Link to="/referrals">
                    <UserPlus className="mr-2" size={18} />
                    <span>Referrals</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary data-[active=true]:bg-sidebar-accent data-[active=true]:text-primary">
                  <Link to="/curated-lists">
                    <FolderOpen className="mr-2" size={18} />
                    <span>Curated lists</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground bg-sidebar">Users</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary data-[active=true]:bg-sidebar-accent data-[active=true]:text-primary">
                  <Link to="/users">
                    <Users2 className="mr-2" size={18} />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary data-[active=true]:bg-sidebar-accent data-[active=true]:text-primary">
                  <Link to="/calendar">
                    <Calendar className="mr-2" size={18} />
                    <span>Calendar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary data-[active=true]:bg-sidebar-accent data-[active=true]:text-primary">
                  <Link to="/notifications">
                    <Bell className="mr-2" size={18} />
                    <span>Notifications</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground bg-sidebar">System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary data-[active=true]:bg-sidebar-accent data-[active=true]:text-primary">
                  <Link to="/update-terms">
                    <FileText className="mr-2" size={18} />
                    <span>Update Terms</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary data-[active=true]:bg-sidebar-accent data-[active=true]:text-primary">
                  <Link to="/settings">
                    <Settings2 className="mr-2" size={18} />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary data-[active=true]:bg-sidebar-accent data-[active=true]:text-primary">
                  <Link to="/logout">
                    <Power className="mr-2" size={18} />
                    <span>Log Out</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}