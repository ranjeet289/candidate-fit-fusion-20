import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { useEntities } from "@/context/EntityContext";
import { Search, MapPin, Linkedin, FileText, Filter, CheckSquare, Mail, Copy, X } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

// Simple tokenization and search functions
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function cosineSim(a: Record<string, number>, b: Record<string, number>): number {
  let dot = 0, na = 0, nb = 0;
  const keys = unique([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) {
    const va = a[k] || 0;
    const vb = b[k] || 0;
    dot += va * vb;
    na += va * va;
    nb += vb * vb;
  }
  if (!na || !nb) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

function vectorize(tokens: string[]): Record<string, number> {
  const v: Record<string, number> = {};
  for (const t of tokens) v[t] = (v[t] || 0) + 1;
  return v;
}

function highlightMatches(text: string, matchedTerms: string[]) {
  if (!text || !matchedTerms.length) return text;
  
  const regex = new RegExp(`(${matchedTerms.join("|")})`, "gi");
  return text.split(regex).map((part, index) => {
    const isMatch = matchedTerms.some(term => 
      part.toLowerCase() === term.toLowerCase()
    );
    return isMatch ? { text: part, highlighted: true } : { text: part, highlighted: false };
  });
}

interface Filters {
  titles: string[];
  companies: string[];
  schools: string[];
  locations: string[];
  fundingRounds: string[];
  likelinessToRespond: string[];
  industry: string[];
  growth: string[];
  investors: string[];
  excludeTitles: string[];
  excludeCompanies: string[];
  degrees: string[];
  excludeDegrees: string[];
  pastJobTitles: string[];
  currentTenure: string[];
  yearsOfExperience: string[];
  graduationYear: string[];
}

const emptyFilters: Filters = {
  titles: [],
  companies: [],
  schools: [],
  locations: [],
  fundingRounds: [],
  likelinessToRespond: [],
  industry: [],
  growth: [],
  investors: [],
  excludeTitles: [],
  excludeCompanies: [],
  degrees: [],
  excludeDegrees: [],
  pastJobTitles: [],
  currentTenure: [],
  yearsOfExperience: [],
  graduationYear: [],
};

export default function ATSSearchTab() {
  console.log('ATSSearchTab: Component rendering');
  
  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard");
  };

  const { candidates, jobs } = useEntities();

  // Draft inputs (change freely)
  const [roleInput, setRoleInput] = useState("");
  // Applied inputs (used for searching)
  const [appliedRole, setAppliedRole] = useState("");
  const [mode, setMode] = useState<"keyword" | "semantic" | "both">("both");

  // Filters: draft vs applied so changes only take effect on Apply/Search
  const [draftFilters, setDraftFilters] = useState<Filters>(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(emptyFilters);

  // UI state
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<any | null>(null);
  const [selectedJobForFilters, setSelectedJobForFilters] = useState<string>("");

  // Submit single
  const [submitOpen, setSubmitOpen] = useState(false);
  const [submitCandidate, setSubmitCandidate] = useState<any | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string>("");

  // Bulk selection + submit
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkJobId, setBulkJobId] = useState<string>("");

  // Outreach functionality
  const [outreachOpen, setOutreachOpen] = useState(false);
  const [outreachCandidate, setOutreachCandidate] = useState<any | null>(null);
  const [selectedPipeline, setSelectedPipeline] = useState<string>("");

  // Mock outreach pipelines
  const outreachPipelines = [
    { id: "pipeline1", name: "AI Engineer Outreach", description: "Technical roles in AI/ML" },
    { id: "pipeline2", name: "Senior Developer Recruitment", description: "Experienced developers" },
    { id: "pipeline3", name: "Startup Talent Pipeline", description: "High-growth startup positions" },
    { id: "pipeline4", name: "Remote-First Outreach", description: "Remote work opportunities" }
  ];

  const onSearchClick = () => {
    setAppliedRole(roleInput);
    setAppliedFilters(draftFilters);
  };

  const onClearResults = () => {
    setRoleInput("");
    setAppliedRole("");
    setDraftFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setSelectedIds(new Set());
    toast.success("Search results cleared");
  };

  const applyFiltersOnly = () => {
    setAppliedFilters(draftFilters);
    setAdvancedOpen(false);
  };

  const clearFilters = () => {
    setDraftFilters(emptyFilters);
  };

  const hasDraftFilters = Object.values(draftFilters).some((v) => v.length > 0);
  const canSearch = Boolean(roleInput.trim() || hasDraftFilters);
  const hasAppliedFilters = Object.values(appliedFilters).some((v) => v.length > 0);

  const suggestions = useMemo(() => {
    const titles = unique(
      candidates
        .map((c: any) => c.title || c.position)
        .filter(Boolean)
        .map((s: string) => String(s))
    ) as string[];

    const companies = unique(
      candidates
        .map((c: any) => c.currentCompany || c.company)
        .filter(Boolean)
        .map((s: string) => String(s))
    ) as string[];

    const schools = unique(
      candidates.flatMap((c: any) =>
        Array.isArray(c.schools)
          ? c.schools
          : Array.isArray(c.education)
          ? c.education
          : c.school
          ? [c.school]
          : []
      ).map((s: any) => String(s))
    ) as string[];

    const locations = unique(
      candidates
        .map((c: any) => c.location)
        .filter(Boolean)
        .map((s: string) => String(s))
    ) as string[];

    const fundingRounds = unique(
      candidates
        .map((c: any) => c.fundingRound || c.funding)
        .filter(Boolean)
        .map((s: string) => String(s))
    ) as string[];

    const likelinessToRespond = ["Very High", "High", "Medium", "Low", "Very Low"];
    const industry = ["Technology", "Healthcare", "Finance", "Education", "Manufacturing", "Retail"];
    const growth = ["High Growth", "Medium Growth", "Low Growth", "Startup", "Established"];
    const investors = ["Sequoia", "Andreessen Horowitz", "Accel", "Greylock", "Kleiner Perkins"];
    const degrees = ["Bachelor's", "Master's", "PhD", "MBA", "Associate"];
    const tenureOptions = ["0-1 years", "1-3 years", "3-5 years", "5+ years"];
    const experienceYears = ["0-2 years", "3-5 years", "6-10 years", "10+ years"];
    const graduationYears = ["2020-2024", "2015-2019", "2010-2014", "2005-2009", "Before 2005"];

    return { 
      titles, 
      companies, 
      schools, 
      locations, 
      fundingRounds, 
      likelinessToRespond,
      industry, 
      growth, 
      investors, 
      degrees, 
      tenureOptions, 
      experienceYears, 
      graduationYears
    };
  }, [candidates]);

  const queryText = `${appliedRole}`.trim();
  const results = useMemo(() => {
    const filtersActive = hasAppliedFilters;
    // Show all candidates by default, or apply search/filters if provided
    const shouldShowAll = !queryText && !filtersActive;
    
    if (shouldShowAll) {
      // Return all candidates with basic scoring
      return candidates.map((c: any) => ({
        candidate: c,
        score: 1.0,
        keywordScore: 0,
        semanticScore: 0,
        matched: [],
        highlightedName: c.name,
        highlightedTitle: c.title,
        highlightedSkills: Array.isArray(c.skills) ? c.skills : [],
      }));
    }

    const qTokens = tokenize(queryText);
    const qVec = vectorize(qTokens);

    return candidates
      .map((c: any) => {
        const textParts = [c.name, c.title, c.location, Array.isArray(c.skills) ? c.skills.join(" ") : c.skills || ""].filter(Boolean);
        const blob = textParts.join(" ").toLowerCase();
        const cTokens = tokenize(blob);
        const cVec = vectorize(cTokens);

        const matched = unique(qTokens.filter((t) => cTokens.includes(t)));
        let keywordScore = matched.length;

        // Location bonus if any of the applied locations match
        if (
          appliedFilters.locations.length > 0 && c.location && typeof c.location === "string" &&
          appliedFilters.locations.some((loc) => String(c.location).toLowerCase().includes(String(loc).toLowerCase()))
        ) {
          keywordScore += 1.5;
        }

        const semanticScore = cosineSim(qVec, cVec);
        let finalScore = 0;
        if (mode === "keyword") finalScore = keywordScore;
        else if (mode === "semantic") finalScore = semanticScore * 10;
        else finalScore = keywordScore * 0.5 + semanticScore * 10 * 0.5;

        // Create highlighted text segments for candidate display
        const highlightedName = highlightMatches(c.name, matched);
        const highlightedTitle = highlightMatches(c.title, matched);
        const highlightedSkills = Array.isArray(c.skills) ? 
          c.skills.map(skill => highlightMatches(skill, matched)) : [];

        return {
          candidate: c,
          score: Number(finalScore.toFixed(3)),
          keywordScore: Number(keywordScore.toFixed(3)),
          semanticScore: Number(semanticScore.toFixed(3)),
          matched,
          highlightedName,
          highlightedTitle,
          highlightedSkills,
        };
      })
      .filter((r) => {
        const c = r.candidate;
        // Filters
        if (appliedFilters.titles.length > 0) {
          const title = c.title || c.position;
          if (!title) return false;
          const ok = appliedFilters.titles.some((t) => String(title).toLowerCase().includes(String(t).toLowerCase()));
          if (!ok) return false;
        }
        if (appliedFilters.companies.length > 0) {
          const company = c.currentCompany || c.company;
          if (!company) return false;
          const ok = appliedFilters.companies.some((co) => String(company).toLowerCase().includes(String(co).toLowerCase()));
          if (!ok) return false;
        }
        if (appliedFilters.schools.length > 0) {
          const schools: string[] = Array.isArray(c.schools)
            ? c.schools
            : Array.isArray(c.education)
            ? c.education
            : c.school
            ? [c.school]
            : [];
          const ok = schools.length > 0 && appliedFilters.schools.some((s) => schools.map((p) => String(p).toLowerCase()).includes(String(s).toLowerCase()));
          if (!ok) return false;
        }
        if (appliedFilters.locations.length > 0) {
          if (!c.location) return false;
          const locOk = appliedFilters.locations.some((loc) => String(c.location).toLowerCase().includes(String(loc).toLowerCase()));
          if (!locOk) return false;
        }
        if (appliedFilters.fundingRounds.length > 0) {
          const funding = c.fundingRound || c.funding;
          if (!funding) return false;
          const ok = appliedFilters.fundingRounds.some((f) => String(funding).toLowerCase().includes(String(f).toLowerCase()));
          if (!ok) return false;
        }
        if (appliedFilters.likelinessToRespond.length > 0) {
          const likelihood = c.likelinessToRespond || c.likelihood || "Medium";
          const ok = appliedFilters.likelinessToRespond.some((l) => String(likelihood).toLowerCase().includes(String(l).toLowerCase()));
          if (!ok) return false;
        }
        
        // Additional filters
        if (appliedFilters.industry.length > 0) {
          const industry = c.industry || "Technology";
          const ok = appliedFilters.industry.some((ind) => String(industry).toLowerCase().includes(String(ind).toLowerCase()));
          if (!ok) return false;
        }
        
        if (appliedFilters.excludeTitles.length > 0) {
          const title = c.title || c.position;
          if (title && appliedFilters.excludeTitles.some((t) => String(title).toLowerCase().includes(String(t).toLowerCase()))) {
            return false;
          }
        }
        
        if (appliedFilters.excludeCompanies.length > 0) {
          const company = c.currentCompany || c.company;
          if (company && appliedFilters.excludeCompanies.some((co) => String(company).toLowerCase().includes(String(co).toLowerCase()))) {
            return false;
          }
        }
        
        if (appliedFilters.degrees.length > 0) {
          const degree = c.degree || "Bachelor's";
          const ok = appliedFilters.degrees.some((d) => String(degree).toLowerCase().includes(String(d).toLowerCase()));
          if (!ok) return false;
        }
        if (r.score <= 0 && !filtersActive && queryText) return false;
        return true;
      })
      .sort((a, b) => b.score - a.score);
  }, [candidates, appliedRole, mode, queryText, appliedFilters, hasAppliedFilters]);

  const onOpen = (c: any) => {
    setActive(c);
    setOpen(true);
  };

  const openSubmit = (c: any) => {
    setSubmitCandidate(c);
    setSelectedJobId("");
    setSubmitOpen(true);
  };

  const handleSubmitNow = () => {
    if (!submitCandidate) return;
    if (!selectedJobId) {
      toast.error("Please select a job JD to submit.");
      return;
    }
    const job = jobs.find((j: any) => String(j.id) === String(selectedJobId));
    toast.success(`Submitted ${submitCandidate.name} to ${job?.title || selectedJobId}`);
    setSubmitOpen(false);
    setSubmitCandidate(null);
  };

  // Bulk submit
  const toggleAll = (checked: boolean) => {
    if (!checked) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(results.map((r) => String(r.candidate.id || r.candidate.name))));
    }
  };
  const toggleOne = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };
  const openBulkSubmit = () => {
    if (selectedIds.size === 0) return;
    setBulkJobId("");
    setBulkOpen(true);
  };
  const handleBulkSubmit = () => {
    if (!bulkJobId) {
      toast.error("Please select a job JD to submit.");
      return;
    }
    const job = jobs.find((j: any) => String(j.id) === String(bulkJobId));
    toast.success(`Submitted ${selectedIds.size} candidate(s) to ${job?.title || bulkJobId}`);
    setBulkOpen(false);
    setSelectedIds(new Set());
  };

  // Auto-populate filters based on selected job
  const handleJobSelection = (jobId: string) => {
    // Support a sentinel value to clear selection from the dropdown safely
    if (jobId === "__clear__") {
      setSelectedJobForFilters("");
      setRoleInput("");
      setDraftFilters(emptyFilters);
      setAppliedFilters(emptyFilters);
      return;
    }

    setSelectedJobForFilters(jobId);

    if (!jobId) {
      // Clear filters if no job selected
      setRoleInput("");
      setDraftFilters(emptyFilters);
      setAppliedFilters(emptyFilters);
      return;
    }

    const selectedJob = jobs.find((j: any) => String(j.id) === String(jobId));
    if (!selectedJob) return;

    // Auto-populate search with job title
    setRoleInput(selectedJob.title);

    // Extract and set filters from job requirements
    const newFilters = { ...emptyFilters };

    // Set location if available
    if (selectedJob.location && selectedJob.location !== "Remote") {
      newFilters.locations = [selectedJob.location];
    }

    // Extract skills from requirements
    const requirements = selectedJob.requirements || [];
    const skillKeywords = requirements.filter((req) =>
      !req.toLowerCase().includes("experience") &&
      !req.toLowerCase().includes("years") &&
      !req.toLowerCase().includes("degree")
    );

    // Map common job requirements to our filter categories
    const titleKeywords: string[] = [];
    const companyKeywords: string[] = [];

    if (selectedJob.title.toLowerCase().includes("senior")) titleKeywords.push("Senior");
    if (selectedJob.title.toLowerCase().includes("lead")) titleKeywords.push("Lead");
    if (selectedJob.title.toLowerCase().includes("principal")) titleKeywords.push("Principal");
    if (selectedJob.title.toLowerCase().includes("manager")) titleKeywords.push("Manager");

    // Set extracted filters
    newFilters.titles = titleKeywords;

    setDraftFilters(newFilters);

    // Auto-apply the filters
    setAppliedRole(selectedJob.title);
    setAppliedFilters(newFilters);

    toast.success(`Filters applied for ${selectedJob.title} position`);
  };

  // Outreach functionality
  const openOutreach = (c: any) => {
    setOutreachCandidate(c);
    setSelectedPipeline("");
    setOutreachOpen(true);
  };

  const handleAddToOutreach = () => {
    if (!outreachCandidate || !selectedPipeline) {
      toast.error("Please select an outreach pipeline.");
      return;
    }
    const pipeline = outreachPipelines.find(p => p.id === selectedPipeline);
    toast.success(`Added ${outreachCandidate.name} to ${pipeline?.name} pipeline`);
    setOutreachOpen(false);
    setOutreachCandidate(null);
  };

  // Helper function to get matching filter values for a candidate
  const getMatchingFilters = (candidate: any) => {
    const matches = [];
    
    if (appliedFilters.titles.length > 0) {
      const title = candidate.title || candidate.position;
      const matchingTitles = appliedFilters.titles.filter(t => 
        title && String(title).toLowerCase().includes(String(t).toLowerCase())
      );
      matches.push(...matchingTitles.map(t => ({ type: 'Title', value: t })));
    }
    
    if (appliedFilters.companies.length > 0) {
      const company = candidate.currentCompany || candidate.company;
      const matchingCompanies = appliedFilters.companies.filter(c => 
        company && String(company).toLowerCase().includes(String(c).toLowerCase())
      );
      matches.push(...matchingCompanies.map(c => ({ type: 'Company', value: c })));
    }
    
    if (appliedFilters.locations.length > 0) {
      const matchingLocations = appliedFilters.locations.filter(loc => 
        candidate.location && String(candidate.location).toLowerCase().includes(String(loc).toLowerCase())
      );
      matches.push(...matchingLocations.map(l => ({ type: 'Location', value: l })));
    }
    
    if (appliedFilters.schools.length > 0) {
      const schools = Array.isArray(candidate.schools) ? candidate.schools : 
                     Array.isArray(candidate.education) ? candidate.education :
                     candidate.school ? [candidate.school] : [];
      const matchingSchools = appliedFilters.schools.filter(s => 
        schools.some(school => String(school).toLowerCase().includes(String(s).toLowerCase()))
      );
      matches.push(...matchingSchools.map(s => ({ type: 'School', value: s })));
    }

    return matches;
  };

  return (
    <div className="space-y-6">
      {/* Modern Unified Search Interface */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
          <div className="p-6">
            <div className="flex flex-col space-y-4">
              {/* Job Selection */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex-1 min-w-0">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Auto-populate from job posting
                  </label>
                  <Select value={selectedJobForFilters} onValueChange={handleJobSelection}>
                    <SelectTrigger className="w-full bg-card">
                      <SelectValue placeholder="Select a job to auto-fill filters..." />
                    </SelectTrigger>
                    <SelectContent className="z-50">
                      <SelectItem value="__clear__">Clear Selection</SelectItem>
                      {jobs.map((job: any) => (
                        <SelectItem key={job.id} value={String(job.id)}>
                          {job.title} - {job.company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedJobForFilters && (
                  <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 px-3 py-2 rounded-md">
                    <CheckSquare className="w-4 h-4" />
                    Auto-applied
                  </div>
                )}
              </div>

              {/* Search Bar */}
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={roleInput}
                    onChange={(e) => setRoleInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        onSearchClick();
                      }
                    }}
                    placeholder="Search by role, title, keywords..."
                    className="pl-10 h-12 bg-card text-base"
                  />
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    onClick={onSearchClick}
                    disabled={!canSearch}
                    className="h-12 px-6"
                    size="default"
                  >
                    Search
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setAdvancedOpen(!advancedOpen)}
                    className="h-12 px-4"
                    size="default"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  {(queryText || hasAppliedFilters) && (
                    <Button variant="outline" onClick={onClearResults} className="h-12 px-4" size="default">
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        {(results.length > 0 || selectedIds.size > 0) && (
          <div className="flex justify-between items-center p-4 bg-muted/50">
            <div className="text-sm text-muted-foreground">
              {queryText || hasAppliedFilters ? (
                <span className="font-medium text-foreground">{results.length} candidates found</span>
              ) : (
                <span className="font-medium text-foreground">{results.length} candidates available</span>
              )}
            </div>
            {selectedIds.size > 0 && (
              <Button 
                size="sm"
                onClick={openBulkSubmit}
                variant="default"
              >
                <CheckSquare className="w-4 h-4 mr-2" />
                Submit {selectedIds.size}
              </Button>
            )}
          </div>
        )}
      </Card>

      {/* Advanced Filters Section */}
      {advancedOpen && (
        <Card>
          <div className="border-b bg-muted/30">
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-semibold text-foreground">Advanced Filters</h3>
                <p className="text-sm text-muted-foreground">Fine-tune your candidate search</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setAdvancedOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="p-4 space-y-6">
            {/* Primary Filters */}
            <div className="space-y-3">
              <div className="text-sm font-medium text-foreground">Core Filters</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <MultiSelect
                  options={suggestions.titles.map(title => ({ value: title, label: title }))}
                  onChange={(values) => setDraftFilters({...draftFilters, titles: values})}
                  selected={draftFilters.titles}
                  placeholder="Job Titles"
                  className="w-full"
                />
                <MultiSelect
                  options={suggestions.companies.map(company => ({ value: company, label: company }))}
                  onChange={(values) => setDraftFilters({...draftFilters, companies: values})}
                  selected={draftFilters.companies}
                  placeholder="Companies"
                  className="w-full"
                />
                <MultiSelect
                  options={suggestions.locations.map(location => ({ value: location, label: location }))}
                  onChange={(values) => setDraftFilters({...draftFilters, locations: values})}
                  selected={draftFilters.locations}
                  placeholder="Locations"
                  className="w-full"
                />
                <MultiSelect
                  options={suggestions.schools.map(school => ({ value: school, label: school }))}
                  onChange={(values) => setDraftFilters({...draftFilters, schools: values})}
                  selected={draftFilters.schools}
                  placeholder="Schools"
                  className="w-full"
                />
                <MultiSelect
                  options={suggestions.fundingRounds.map(round => ({ value: round, label: round }))}
                  onChange={(values) => setDraftFilters({...draftFilters, fundingRounds: values})}
                  selected={draftFilters.fundingRounds}
                  placeholder="Funding Stage"
                  className="w-full"
                />
                <MultiSelect
                  options={suggestions.likelinessToRespond.map(level => ({ value: level, label: level }))}
                  onChange={(values) => setDraftFilters({...draftFilters, likelinessToRespond: values})}
                  selected={draftFilters.likelinessToRespond}
                  placeholder="Response Rate"
                  className="w-full"
                />
              </div>
            </div>

            {/* Secondary Filters */}
            <div className="space-y-3 pt-3 border-t">
              <div className="text-sm font-medium text-foreground">Additional Filters</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <MultiSelect
                  options={suggestions.industry.map(item => ({ value: item, label: item }))}
                  onChange={(values) => setDraftFilters({...draftFilters, industry: values})}
                  selected={draftFilters.industry}
                  placeholder="Industry"
                  className="w-full"
                />
                <MultiSelect
                  options={suggestions.growth.map(item => ({ value: item, label: item }))}
                  onChange={(values) => setDraftFilters({...draftFilters, growth: values})}
                  selected={draftFilters.growth}
                  placeholder="Growth Stage"
                  className="w-full"
                />
                <MultiSelect
                  options={suggestions.degrees.map(degree => ({ value: degree, label: degree }))}
                  onChange={(values) => setDraftFilters({...draftFilters, degrees: values})}
                  selected={draftFilters.degrees}
                  placeholder="Degrees"
                  className="w-full"
                />
                <MultiSelect
                  options={suggestions.tenureOptions.map(tenure => ({ value: tenure, label: tenure }))}
                  onChange={(values) => setDraftFilters({...draftFilters, currentTenure: values})}
                  selected={draftFilters.currentTenure}
                  placeholder="Current Tenure"
                  className="w-full"
                />
                <MultiSelect
                  options={suggestions.experienceYears.map(years => ({ value: years, label: years }))}
                  onChange={(values) => setDraftFilters({...draftFilters, yearsOfExperience: values})}
                  selected={draftFilters.yearsOfExperience}
                  placeholder="Experience"
                  className="w-full"
                />
                <MultiSelect
                  options={suggestions.graduationYears.map(year => ({ value: year, label: year }))}
                  onChange={(values) => setDraftFilters({...draftFilters, graduationYear: values})}
                  selected={draftFilters.graduationYear}
                  placeholder="Graduation Year"
                  className="w-full"
                />
              </div>
            </div>

            {/* Exclusion Filters */}
            <div className="space-y-3 pt-3 border-t">
              <div className="text-sm font-medium text-foreground">Exclusion Filters</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <MultiSelect
                  options={suggestions.titles.map(title => ({ value: title, label: title }))}
                  onChange={(values) => setDraftFilters({...draftFilters, excludeTitles: values})}
                  selected={draftFilters.excludeTitles}
                  placeholder="Exclude Job Titles"
                  className="w-full"
                />
                <MultiSelect
                  options={suggestions.companies.map(company => ({ value: company, label: company }))}
                  onChange={(values) => setDraftFilters({...draftFilters, excludeCompanies: values})}
                  selected={draftFilters.excludeCompanies}
                  placeholder="Exclude Companies"
                  className="w-full"
                />
                <MultiSelect
                  options={suggestions.degrees.map(degree => ({ value: degree, label: degree }))}
                  onChange={(values) => setDraftFilters({...draftFilters, excludeDegrees: values})}
                  selected={draftFilters.excludeDegrees}
                  placeholder="Exclude Degrees"
                  className="w-full"
                />
              </div>
            </div>
            
            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t bg-muted/20 -mx-4 px-4 py-3 -mb-4">
              <div className="text-sm text-muted-foreground">
                {Object.values(draftFilters).filter(arr => arr.length > 0).length > 0 ? 
                  `${Object.values(draftFilters).reduce((sum, arr) => sum + arr.length, 0)} filters selected` :
                  'No filters selected'
                }
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearFilters}
                  disabled={!hasDraftFilters}
                >
                  Clear All
                </Button>
                <Button 
                  size="sm"
                  onClick={applyFiltersOnly} 
                  disabled={!hasDraftFilters}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Results */}
      <section className="space-y-3">
        {results.length > 0 && (
          <div className="flex items-center gap-3">
            <Checkbox
              id="select-all"
              checked={selectedIds.size > 0 && selectedIds.size === results.length}
              onCheckedChange={(v: any) => toggleAll(Boolean(v))}
            />
            <label htmlFor="select-all" className="text-sm text-muted-foreground">Select all</label>
            {selectedIds.size > 0 && (
              <span className="text-sm text-muted-foreground">{selectedIds.size} selected</span>
            )}
          </div>
        )}
        <div className="grid gap-3">
          {results.map((r) => {
            const c = r.candidate;
            const linkedin = c.linkedinUrl || c.linkedin;
            const resume = c.resumeUrl;
            const id = String(c.id || c.name);
            const isChecked = selectedIds.has(id);
            return (
              <Card key={id} className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(v: any) => toggleOne(id, Boolean(v))}
                      className="mt-1"
                    />
                     <div className="space-y-1">
                       <div className="flex items-center gap-2">
                         <button onClick={() => onOpen(c)} className="text-left font-semibold text-foreground hover:underline">
                           {typeof r.highlightedName === "string" ? r.highlightedName : 
                             r.highlightedName?.map((segment: any, i: number) => (
                               <span key={i} className={segment.highlighted ? "bg-yellow-200 px-1 rounded" : ""}>
                                 {segment.text}
                               </span>
                             )) || c.name
                           }
                         </button>
                         <div className="flex gap-1">
                           <Button variant="ghost" size="sm" className="h-6 w-6 p-0" asChild disabled={!linkedin}>
                             <a href={linkedin ? (linkedin.startsWith("http") ? linkedin : `https://${linkedin}`) : "#"} target="_blank" rel="noopener noreferrer">
                               <Linkedin className="w-3 h-3 text-blue-600" />
                             </a>
                           </Button>
                           <Button variant="ghost" size="sm" className="h-6 w-6 p-0" asChild disabled={!resume}>
                             <a href={resume || "#"} target="_blank" rel="noopener noreferrer">
                               <FileText className="w-3 h-3 text-gray-600" />
                             </a>
                           </Button>
                         </div>
                       </div>
                       <div className="text-sm text-muted-foreground flex items-center gap-2">
                         <span>
                           {typeof r.highlightedTitle === "string" ? r.highlightedTitle :
                             r.highlightedTitle?.map((segment: any, i: number) => (
                               <span key={i} className={segment.highlighted ? "bg-yellow-200 px-1 rounded" : ""}>
                                 {segment.text}
                               </span>
                             )) || c.title
                           }
                         </span>
                         {c.location && (
                           <span className="inline-flex items-center gap-1">
                             <MapPin className="w-3.5 h-3.5" /> {c.location}
                           </span>
                         )}
                       </div>
                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
                         <Mail className="w-3 h-3" />
                         <span>{c.email || `${c.name.toLowerCase().replace(' ', '.')}@email.com`}</span>
                         <Button 
                           variant="ghost" 
                           size="sm" 
                           className="h-6 w-6 p-0"
                           onClick={() => copyEmail(c.email || `${c.name.toLowerCase().replace(' ', '.')}@email.com`)}
                         >
                           <Copy className="w-3 h-3" />
                         </Button>
                       </div>
                       
                       {/* Matching Filters Display */}
                       {(hasAppliedFilters || selectedJobForFilters) && (
                         <div className="flex flex-wrap gap-1 mt-2">
                           {getMatchingFilters(c).map((match, idx) => (
                             <Badge key={idx} variant="secondary" className="text-xs">
                               {match.type}: {match.value}
                             </Badge>
                           ))}
                         </div>
                       )}
                     </div>
                  </div>
                  <div className="flex items-center gap-2 md:self-start">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openOutreach(c)}
                      className="bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700"
                    >
                      Add to Outreach
                    </Button>
                    <Button size="sm" onClick={() => openSubmit(c)}>
                      Submit to Job
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Outreach Pipeline Dialog */}
      <Dialog open={outreachOpen} onOpenChange={setOutreachOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to Outreach Pipeline</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <div className="font-semibold">{outreachCandidate?.name}</div>
              <div className="text-sm text-muted-foreground">{outreachCandidate?.title}</div>
              <div className="text-sm text-muted-foreground">{outreachCandidate?.email || `${outreachCandidate?.name.toLowerCase().replace(' ', '.')}@email.com`}</div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Select Outreach Pipeline</label>
              <Select value={selectedPipeline} onValueChange={setSelectedPipeline}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose an outreach pipeline" />
                </SelectTrigger>
                <SelectContent>
                  {outreachPipelines.map((pipeline) => (
                    <SelectItem key={pipeline.id} value={pipeline.id}>
                      <div>
                        <div className="font-medium">{pipeline.name}</div>
                        <div className="text-sm text-gray-500">{pipeline.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setOutreachOpen(false)}>Cancel</Button>
              <Button onClick={handleAddToOutreach} className="bg-purple-600 hover:bg-purple-700">
                Add to Pipeline
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Submit single candidate dialog */}
      <Dialog open={submitOpen} onOpenChange={setSubmitOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Candidate</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <div className="font-semibold">{submitCandidate?.name}</div>
              <div className="text-sm text-muted-foreground">{submitCandidate?.title}</div>
            </div>
            <Select value={selectedJobId} onValueChange={setSelectedJobId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select job to submit to" />
              </SelectTrigger>
              <SelectContent>
                {jobs.map((job: any) => (
                  <SelectItem key={job.id} value={String(job.id)}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setSubmitOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitNow}>Submit</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk submit dialog */}
      <Dialog open={bulkOpen} onOpenChange={setBulkOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Selected Candidates</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>{selectedIds.size} candidate(s) selected</div>
            <Select value={bulkJobId} onValueChange={setBulkJobId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select job to submit to" />
              </SelectTrigger>
              <SelectContent>
                {jobs.map((job: any) => (
                  <SelectItem key={job.id} value={String(job.id)}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setBulkOpen(false)}>Cancel</Button>
              <Button onClick={handleBulkSubmit}>Submit</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}