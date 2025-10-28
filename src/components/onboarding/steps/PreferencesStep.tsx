import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Set Your Preferences
        </h2>
        <p className="text-muted-foreground">
          Customize how you want to use Synapse
        </p>
      </div>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Notifications</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates via email
              </p>
            </div>
            <Switch
              id="emailNotifications"
              checked={emailNotifications}
              onCheckedChange={(checked) => setValue('emailNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="inAppNotifications">In-App Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Show notifications in the app
              </p>
            </div>
            <Switch
              id="inAppNotifications"
              checked={inAppNotifications}
              onCheckedChange={(checked) => setValue('inAppNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="weeklyDigest">Weekly Digest</Label>
              <p className="text-sm text-muted-foreground">
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

        {/* Regional Settings */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Regional Settings</h3>
          
          <div>
            <Label htmlFor="timezone">Time Zone</Label>
            <Select 
              value={selectedTimezone} 
              onValueChange={(value) => setValue('timezone', value)}
            >
              <SelectTrigger className="mt-1">
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
              <p className="text-sm text-destructive mt-1">{errors.timezone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="language">Language</Label>
            <Select 
              value={selectedLanguage} 
              onValueChange={(value) => setValue('language', value)}
            >
              <SelectTrigger className="mt-1">
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
              <p className="text-sm text-destructive mt-1">{errors.language.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onPrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button type="submit">
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
