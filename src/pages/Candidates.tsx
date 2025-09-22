import { useEffect } from "react";
import { usePageTitle } from "@/hooks/use-page-title";
import PlatformCandidates from "@/components/candidates/PlatformCandidates";

export default function CandidatesPage() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Active Pipeline");
  }, [setTitle]);

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="p-6">
        <PlatformCandidates />
      </div>
    </div>
  );
}
