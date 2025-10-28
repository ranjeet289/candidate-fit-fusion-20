import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Award, Star } from 'lucide-react';
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
  const bioLength = watch('bio')?.length || 0;

  const toggleSpecialization = (spec: string) => {
    const newSpecs = selectedSpecs.includes(spec)
      ? selectedSpecs.filter(s => s !== spec)
      : [...selectedSpecs, spec];
    setSelectedSpecs(newSpecs);
    setValue('specializations', newSpecs);
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-foreground">
          Your Recruiting Expertise
        </h2>
        <p className="text-muted-foreground text-lg">
          Help us understand your recruitment background
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="experience" className="text-base flex items-center gap-2">
            <Award className="h-4 w-4 text-primary" />
            Years of Experience
          </Label>
          <Select 
            value={selectedExperience} 
            onValueChange={(value) => setValue('experience', value)}
          >
            <SelectTrigger className="h-12 text-base">
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
            <p className="text-sm text-destructive">{errors.experience.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-base flex items-center gap-2">
            <Star className="h-4 w-4 text-primary" />
            Specializations
          </Label>
          <p className="text-sm text-muted-foreground">
            Click to select all areas you specialize in
          </p>
          <div className="flex flex-wrap gap-2 p-4 border rounded-lg bg-muted/30">
            {availableSpecializations.map((spec) => (
              <Badge
                key={spec}
                variant={selectedSpecs.includes(spec) ? "default" : "outline"}
                className="cursor-pointer hover:scale-105 transition-all text-sm py-2 px-4"
                onClick={() => toggleSpecialization(spec)}
              >
                {spec}
              </Badge>
            ))}
          </div>
          {errors.specializations && (
            <p className="text-sm text-destructive">{errors.specializations.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio" className="text-base">
            About You
          </Label>
          <p className="text-sm text-muted-foreground">
            Tell us about your recruiting approach and what makes you unique
          </p>
          <Textarea
            id="bio"
            placeholder="I'm passionate about connecting talented individuals with amazing opportunities..."
            {...register('bio')}
            className="min-h-[140px] text-base"
          />
          <div className="flex justify-between items-center">
            <p className={`text-xs ${bioLength < 20 ? 'text-destructive' : bioLength > 500 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {bioLength} / 500 characters {bioLength < 20 && '(minimum 20)'}
            </p>
          </div>
          {errors.bio && (
            <p className="text-sm text-destructive">{errors.bio.message}</p>
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
