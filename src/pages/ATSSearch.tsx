import { useEffect } from "react";
import { usePageTitle } from "@/hooks/use-page-title";
import ATSSearchTab from "@/components/candidates/ATSSearchTab";

export default function ATSSearchPage() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("ATS Search");
  }, [setTitle]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto p-6">
        <ATSSearchTab />
      </div>
    </div>
  );
}
