import { useAuth } from '@/context/AuthContext';
import { useTourContext } from '@/context/TourContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut, Sparkles, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getEarnedBadges, hasRecentlyUnlockedBadge } from '@/lib/achievement-badges';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const { restartTour, completedLevels } = useTourContext();
  const navigate = useNavigate();
  const earnedBadges = getEarnedBadges(completedLevels);
  const hasNewBadge = hasRecentlyUnlockedBadge();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="relative">
          <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          
          {/* Badge count indicator */}
          {earnedBadges.length > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center border-2 border-background">
              <Trophy className="w-3 h-3 text-primary-foreground" />
            </div>
          )}
          
          {/* New badge notification dot */}
          {hasNewBadge && (
            <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse border border-background" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/profile?tab=learning')}>
          <Trophy className="mr-2 h-4 w-4 text-primary" />
          <span>Achievements ({earnedBadges.length}/5)</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={restartTour}>
          <Sparkles className="mr-2 h-4 w-4" />
          Take Product Tour
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
