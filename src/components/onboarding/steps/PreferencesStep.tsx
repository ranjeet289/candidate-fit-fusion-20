import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, Bell, Mail, Calendar, Globe, Languages } from 'lucide-react';

const schema = z.object({
  emailNotifications: z.boolean(),
  inAppNotifications: z.boolean(),
  weeklyDigest: z.boolean(),
  timezone: z.string().min(1, 'Please select a timezone'),
  language: z.string().min(1, 'Please select a language'),
});

type FormData = z.infer<typeof schema>;

interface PreferencesStepProps {
  onNext: (data: FormData) => void;
  onPrevious: () => void;
  formData: any;
}

const timezones = [
  'UTC-8 (PST)',
  'UTC-5 (EST)',
  'UTC+0 (GMT)',
  'UTC+1 (CET)',
  'UTC+8 (SGT)',
  'UTC+9 (JST)',
  'UTC+10 (AEST)',
];

const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'];

export default function PreferencesStep({ onNext, onPrevious, formData }: PreferencesStepProps) {
  const { handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      emailNotifications: formData.emailNotifications ?? true,
      inAppNotifications: formData.inAppNotifications ?? true,
      weeklyDigest: formData.weeklyDigest ?? false,
      timezone: formData.timezone || '',
      language: formData.language || 'English',
    },
  });

  const emailNotifications = watch('emailNotifications');
  const inAppNotifications = watch('inAppNotifications');
  const weeklyDigest = watch('weeklyDigest');
  const selectedTimezone = watch('timezone');
  const selectedLanguage = watch('language');

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-foreground">
          Set Your Preferences
        </h2>
        <p className="text-muted-foreground text-lg">
          Customize how you want to use Synapse
        </p>
      </div>

      <div className="space-y-8">
        {/* Notifications Card */}
        <div className="p-6 border rounded-xl bg-card space-y-5">
          <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="emailNotifications" className="cursor-pointer">Email Notifications</Label>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  Receive updates via email
                </p>
              </div>
              <Switch
                id="emailNotifications"
                checked={emailNotifications}
                onCheckedChange={(checked) => setValue('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="inAppNotifications" className="cursor-pointer">In-App Notifications</Label>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  Show notifications in the app
                </p>
              </div>
              <Switch
                id="inAppNotifications"
                checked={inAppNotifications}
                onCheckedChange={(checked) => setValue('inAppNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="weeklyDigest" className="cursor-pointer">Weekly Digest</Label>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  Get a summary of your week every Monday
                </p>
              </div>
              <Switch
                id="weeklyDigest"
                checked={weeklyDigest}
                onCheckedChange={(checked) => setValue('weeklyDigest', checked)}
              />
            </div>
          </div>
        </div>

        {/* Regional Settings Card */}
        <div className="p-6 border rounded-xl bg-card space-y-5">
          <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Regional Settings
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-base flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                Time Zone
              </Label>
              <Select 
                value={selectedTimezone} 
                onValueChange={(value) => setValue('timezone', value)}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select your timezone" />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.timezone && (
                <p className="text-sm text-destructive">{errors.timezone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="language" className="text-base flex items-center gap-2">
                <Languages className="h-4 w-4 text-muted-foreground" />
                Language
              </Label>
              <Select 
                value={selectedLanguage} 
                onValueChange={(value) => setValue('language', value)}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select your language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.language && (
                <p className="text-sm text-destructive">{errors.language.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onPrevious} size="lg">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button type="submit" size="lg">
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
