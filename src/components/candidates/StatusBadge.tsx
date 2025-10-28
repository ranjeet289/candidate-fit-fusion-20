import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusDefinitions: Record<string, string> = {
  'Active': 'Newly added candidate, ready for submission',
  'Submitted to AM': 'Sent to Account Manager for internal review',
  'Submitted to Client': 'Candidate profile presented to hiring company',
  'Sendout': 'Interview has been scheduled with client',
  'Next Interview': 'Candidate is advancing to the next interview round',
  'Final Interview': 'Candidate is in the final interview stage before offer',
  'Offer': 'Candidate has received a job offer',
  'Rejected': 'Candidate is no longer being considered for this position',
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'bg-green-100 text-green-700 border-green-200';
    case 'Submitted to AM': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Submitted to Client': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'Sendout': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'Next Interview': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'Final Interview': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
    case 'Offer': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const definition = statusDefinitions[status] || 'No description available';
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Badge className={`${getStatusColor(status)} ${className} cursor-help`}>
            {status}
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <p className="text-sm">{definition}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
