import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Lock, Sparkles } from 'lucide-react';
import { AchievementBadge, ACHIEVEMENT_BADGES } from '@/lib/achievement-badges';
import ConfettiExplosion from 'react-confetti-explosion';
import { cn } from '@/lib/utils';

interface BadgeUnlockModalProps {
  badge: AchievementBadge | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BadgeUnlockModal({ badge, isOpen, onClose }: BadgeUnlockModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen && badge) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, badge]);

  if (!badge) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {showConfetti && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
            <ConfettiExplosion
              particleCount={150}
              width={1600}
              colors={[badge.colors.primary, badge.colors.secondary, '#FFD700', '#FFA500']}
            />
          </div>
        )}
        
        <div className="text-center space-y-4 py-6 relative">
          {/* Animated badge reveal */}
          <div className="relative flex justify-center">
            <div 
              className="w-32 h-32 rounded-full flex items-center justify-center animate-badge-unlock"
              style={{
                background: `linear-gradient(135deg, ${badge.colors.primary}, ${badge.colors.secondary})`,
                boxShadow: `0 0 60px ${badge.colors.glow}, 0 0 120px ${badge.colors.glow}`,
              }}
            >
              <badge.icon className="w-16 h-16 text-white" />
            </div>
            
            {/* Sparkle decorations */}
            <Sparkles className="w-6 h-6 text-yellow-400 absolute top-0 right-1/4 animate-ping" />
            <Sparkles className="w-6 h-6 text-yellow-400 absolute bottom-0 left-1/4 animate-ping" style={{ animationDelay: '0.1s' }} />
            <Sparkles className="w-5 h-5 text-yellow-300 absolute top-1/4 left-0 animate-ping" style={{ animationDelay: '0.2s' }} />
          </div>
          
          <div className="space-y-2">
            <Badge 
              className="mb-2 uppercase text-xs font-bold px-3 py-1"
              style={{ 
                backgroundColor: badge.colors.primary,
                color: 'white',
              }}
            >
              {badge.rarity}
            </Badge>
            <h2 className="text-3xl font-bold mb-2">🎉 Badge Unlocked!</h2>
            <h3 className="text-2xl font-semibold text-primary mb-2">{badge.name}</h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">{badge.description}</p>
            <div className="text-2xl font-bold text-primary">+{badge.points} Points</div>
          </div>
          
          {/* Progress indicator */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium text-foreground">Your Achievement Journey</p>
            <div className="flex items-center justify-center gap-2">
              {ACHIEVEMENT_BADGES.map((b, i) => (
                <div 
                  key={b.id} 
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                    i + 1 <= badge.level 
                      ? "ring-2 ring-primary ring-offset-2" 
                      : "opacity-40"
                  )}
                  style={
                    i + 1 <= badge.level
                      ? {
                          background: `linear-gradient(135deg, ${b.colors.primary}, ${b.colors.secondary})`,
                        }
                      : { backgroundColor: 'hsl(var(--muted))' }
                  }
                >
                  {i + 1 <= badge.level ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {badge.level}/5 Achievements Unlocked
            </p>
          </div>
          
          <Button onClick={onClose} className="w-full" size="lg">
            Awesome! Continue Journey
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
