import { useEffect, useState } from 'react';
import { usePageTitle } from '@/hooks/use-page-title';
import { useAuth } from '@/context/AuthContext';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Lock, Bell, Trash2, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import { TourLevelSelector } from '@/components/onboarding/TourLevelSelector';
import { useTourContext } from '@/context/TourContext';

export default function Profile() {
  const { setTitle } = usePageTitle();
  const { user, updateUser, logout } = useAuth();
  const { completedLevels, highestAvailableLevel, completeAllTours } = useTourContext();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');

  useEffect(() => {
    setTitle('Profile');
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [setTitle, searchParams]);

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully');
  };

  const handleChangePassword = () => {
    toast.success('Password changed successfully');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      logout();
      toast.success('Account deleted');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="learning">
              <GraduationCap className="h-4 w-4 mr-2" />
              Learning
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-2xl">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      JPG, PNG or GIF. Max size 2MB
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user?.name} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user?.email} className="mt-1" disabled />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Tell us about yourself..."
                      className="mt-1 min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input 
                      id="linkedin" 
                      type="url" 
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" className="mt-1" />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleChangePassword}>Update Password</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible actions that will affect your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Delete Account</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="learning" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Learning Journey</CardTitle>
                    <CardDescription>
                      Complete interactive tours to master all features
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        if (confirm('Mark all tour levels as complete? This is for testing/demo purposes.')) {
                          completeAllTours();
                          toast.success('All Tours Completed! 🎉', {
                            description: 'All 5 tour levels have been marked as complete.',
                          });
                        }
                      }}
                    >
                      Mark All Complete
                    </Button>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">
                        {completedLevels.length}/5
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Levels Complete
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{Math.round((completedLevels.length / 5) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${(completedLevels.length / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{completedLevels.length}</div>
                      <div className="text-xs text-muted-foreground">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{highestAvailableLevel}</div>
                      <div className="text-xs text-muted-foreground">Available</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{5 - completedLevels.length}</div>
                      <div className="text-xs text-muted-foreground">Remaining</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Tour Levels</CardTitle>
                <CardDescription>
                  Start or review any available tour level
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <TourLevelSelector />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive in-app notifications</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Digest</p>
                      <p className="text-sm text-muted-foreground">Get a summary every Monday</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
