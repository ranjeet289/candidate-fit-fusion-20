import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Tell us about yourself
        </h2>
        <p className="text-muted-foreground">
          Help us personalize your experience
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="linkedinUrl">LinkedIn Profile (Optional)</Label>
          <Input
            id="linkedinUrl"
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            {...register('linkedinUrl')}
            className="mt-1"
          />
          {errors.linkedinUrl && (
            <p className="text-sm text-destructive mt-1">{errors.linkedinUrl.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="region">Region</Label>
          <Select 
            value={selectedRegion} 
            onValueChange={(value) => setValue('region', value)}
          >
            <SelectTrigger className="mt-1">
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
            <p className="text-sm text-destructive mt-1">{errors.region.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="industry">Primary Industry</Label>
          <Select 
            value={selectedIndustry} 
            onValueChange={(value) => setValue('industry', value)}
          >
            <SelectTrigger className="mt-1">
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
            <p className="text-sm text-destructive mt-1">{errors.industry.message}</p>
          )}
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
