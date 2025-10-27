import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useState } from 'react';

const schema = z.object({
  experience: z.string().min(1, 'Please select your experience level'),
  specializations: z.array(z.string()).min(1, 'Please select at least one specialization'),
  bio: z.string().min(20, 'Bio must be at least 20 characters').max(500, 'Bio must be less than 500 characters'),
});

type FormData = z.infer<typeof schema>;

interface RecruiterProfileStepProps {
  onNext: (data: FormData) => void;
  onPrevious: () => void;
  formData: any;
}

const experienceLevels = ['< 1 year', '1-3 years', '3-5 years', '5-10 years', '10+ years'];
const availableSpecializations = [
  'Software Engineering',
  'Sales',
  'Marketing',
  'Product Management',
  'Design',
  'Data Science',
  'Executive Search',
  'Finance',
  'Operations',
  'Healthcare',
];

export default function RecruiterProfileStep({ onNext, onPrevious, formData }: RecruiterProfileStepProps) {
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>(formData.specializations || []);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...formData,
      specializations: selectedSpecs,
    },
  });

  const selectedExperience = watch('experience');

  const toggleSpecialization = (spec: string) => {
    const newSpecs = selectedSpecs.includes(spec)
      ? selectedSpecs.filter(s => s !== spec)
      : [...selectedSpecs, spec];
    setSelectedSpecs(newSpecs);
    setValue('specializations', newSpecs);
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Your Recruiting Expertise
        </h2>
        <p className="text-muted-foreground">
          Help us understand your recruitment background
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="experience">Years of Experience</Label>
          <Select 
            value={selectedExperience} 
            onValueChange={(value) => setValue('experience', value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select your experience level" />
            </SelectTrigger>
            <SelectContent>
              {experienceLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.experience && (
            <p className="text-sm text-destructive mt-1">{errors.experience.message}</p>
          )}
        </div>

        <div>
          <Label>Specializations</Label>
          <p className="text-sm text-muted-foreground mb-3">
            Select all areas you specialize in
          </p>
          <div className="flex flex-wrap gap-2">
            {availableSpecializations.map((spec) => (
              <Badge
                key={spec}
                variant={selectedSpecs.includes(spec) ? "default" : "outline"}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => toggleSpecialization(spec)}
              >
                {spec}
                {selectedSpecs.includes(spec) && (
                  <X className="ml-1 h-3 w-3" />
                )}
              </Badge>
            ))}
          </div>
          {errors.specializations && (
            <p className="text-sm text-destructive mt-1">{errors.specializations.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="bio">About You</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Tell us about your recruiting approach and what makes you unique
          </p>
          <Textarea
            id="bio"
            placeholder="I'm passionate about connecting talented individuals with amazing opportunities..."
            {...register('bio')}
            className="mt-1 min-h-[120px]"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {watch('bio')?.length || 0} / 500 characters
          </p>
          {errors.bio && (
            <p className="text-sm text-destructive mt-1">{errors.bio.message}</p>
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
