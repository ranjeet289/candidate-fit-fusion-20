import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, Linkedin, Globe, Briefcase } from 'lucide-react';

const schema = z.object({
  linkedinUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  region: z.string().min(1, 'Please select a region'),
  industry: z.string().min(1, 'Please select an industry'),
});

type FormData = z.infer<typeof schema>;

interface PersonalInfoStepProps {
  onNext: (data: FormData) => void;
  onPrevious: () => void;
  formData: any;
}

const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa'];
const industries = ['Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Consulting', 'Other'];

export default function PersonalInfoStep({ onNext, onPrevious, formData }: PersonalInfoStepProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: formData,
  });

  const selectedRegion = watch('region');
  const selectedIndustry = watch('industry');

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-foreground">
          Tell us about yourself
        </h2>
        <p className="text-muted-foreground text-lg">
          Help us personalize your experience
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="linkedinUrl" className="text-base flex items-center gap-2">
            <Linkedin className="h-4 w-4 text-primary" />
            LinkedIn Profile
            <span className="text-muted-foreground text-sm font-normal">(Optional)</span>
          </Label>
          <Input
            id="linkedinUrl"
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            {...register('linkedinUrl')}
            className="h-12 text-base"
          />
          {errors.linkedinUrl && (
            <p className="text-sm text-destructive flex items-center gap-1">
              {errors.linkedinUrl.message}
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            We'll never post anything without your permission
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="region" className="text-base flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            Region
          </Label>
          <Select 
            value={selectedRegion} 
            onValueChange={(value) => setValue('region', value)}
          >
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder="Select your region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.region && (
            <p className="text-sm text-destructive">{errors.region.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry" className="text-base flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" />
            Primary Industry
          </Label>
          <Select 
            value={selectedIndustry} 
            onValueChange={(value) => setValue('industry', value)}
          >
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.industry && (
            <p className="text-sm text-destructive">{errors.industry.message}</p>
          )}
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
