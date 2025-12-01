"use client";

import { useState, useEffect } from "react";
import { 
  FileText, 
  CalendarCheck, 
  Sparkles, 
  Smartphone, 
  CheckCircle, 
  Plug,
  ArrowRight,
  Check
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

const features = [
  {
    id: "tab-1",
    number: "1",
    title: "Define",
    problem:
      "Scheduling rules are undocumented. Coverage requirements live in people's heads, not systems.",
    solution:
      "Momentum works with you to document coverage rules, patterns, fairness targets, and constraints.",
    outcome:
      "A clear, consistent foundation that makes automation reliable and eliminates guesswork.",
    icon: FileText,
    image: "/src/assets/screenshots/problem-solving.svg",
  },
  {
    id: "tab-2",
    number: "2",
    title: "Request",
    problem:
      "PTO and shift requests are scattered across emails, texts, and spreadsheets.",
    solution:
      "Providers submit requests directly in Momentum. Everything is tracked, approved, and fed into generation.",
    outcome:
      "No missed requests. Total transparency. Zero manual consolidation.",
    icon: CalendarCheck,
    image: "/src/assets/screenshots/action-buttons.svg",
  },
  {
    id: "tab-3",
    number: "3",
    title: "Generate",
    problem:
      "Building schedules takes days and still leaves coverage gaps or fairness issues.",
    solution:
      "Momentum generates 3–6 months of balanced schedules in minutes with rules applied automatically.",
    outcome:
      "Fair rotations, no gaps, and massive time savings.",
    icon: Sparkles,
    image: "/src/assets/screenshots/look-ahead.png",
  },
  {
    id: "tab-4",
    number: "4",
    title: "Manage",
    problem:
      "Providers aren't kept in sync. Changes, swaps, and updates cause confusion.",
    solution:
      "Mobile app with real-time updates, swap workflows, and personal calendar sync.",
    outcome:
      "Smooth operations. No missed updates. Everyone is aligned.",
    icon: Smartphone,
    image: "/src/assets/screenshots/mm-mobile.webp",
  },
  {
    id: "tab-5",
    number: "5",
    title: "Validate",
    problem:
      "Mistakes are caught after publishing, creating conflicts and compliance risks.",
    solution:
      "Momentum flags gaps, OT issues, rule violations, and fairness problems before publishing.",
    outcome:
      "Confident schedule releases and fewer fixes.",
    icon: CheckCircle,
    image: "/src/assets/screenshots/planning.svg",
  },
  {
    id: "tab-6",
    number: "6",
    title: "Integrate",
    problem:
      "Schedules don't sync to payroll, RIS, EHR, T&A — leading to double entry and mismatched data.",
    solution:
      "Momentum syncs automatically with payroll, practice management, RIS/EHR, Snowflake, calendars, etc.",
    outcome:
      "One source of truth. Accurate data everywhere. Zero manual updates.",
    icon: Plug,
    image: null,
  },
];

export default function FullTimelineView() {
  const [activeTab, setActiveTab] = useState("tab-1");
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = features.findIndex((f) => f.id === current);
        const nextIndex = (currentIndex + 1) % features.length;
        return features[nextIndex].id;
      });
    }, 5000); 

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleTabHover = (value: string) => {
    setActiveTab(value);
    setIsPaused(true);
  };

  const handleContainerMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section id="features-grid" className="section-padding bg-surface-alt">
      <div className="container">
        <div className="mb-20 max-w-2xl">
          <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary px-3 py-1.5 text-sm font-medium">How It Works</Badge>
          <h2 className="mb-4 mt-8 text-balance text-display-section">
            Schedule smarter, not harder
          </h2>
          <p className="text-muted-foreground text-lead">
            From policy definition to automated scheduling to system integration—everything you need to reclaim <span className="text-foreground font-semibold">80% of your admin time</span>.
          </p>
        </div>
        <div className="hidden lg:block" onMouseLeave={handleContainerMouseLeave}>
          <Tabs value={activeTab}>
            <TabsList className="relative grid items-start gap-3 lg:grid-cols-6">
              <div className="bg-input absolute left-4 right-0 top-[30px] -z-10 h-px"></div>
              {features.map((feature) => (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="group"
                  onMouseEnter={() => handleTabHover(feature.id)}
                >
                  <div className="hover:bg-accent/30 group-data-[state=active]:bg-accent/50 flex gap-4 rounded-lg px-3 py-3 cursor-pointer transition-all">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="bg-primary text-primary-foreground group-data-[state=active]:ring-2 group-data-[state=active]:ring-primary group-data-[state=active]:ring-offset-2 group-data-[state=active]:ring-offset-background flex aspect-square w-10 shrink-0 items-center justify-center rounded-lg transition-all shadow-sm group-data-[state=active]:shadow-md">
                          <feature.icon className="size-5" strokeWidth={2.5} />
                        </div>
                        <div className="absolute -top-1 -right-1 bg-background border border-border rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold text-primary group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground transition-all">
                          {feature.number}
                        </div>
                      </div>
                      <h3 className="font-semibold text-base group-data-[state=active]:text-foreground text-muted-foreground transition-colors">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                  <div className="bg-card text-card-foreground border-input mt-3 block rounded-xl border p-4 lg:hidden">
                    <div className="space-y-3">
                      <div className="space-y-3">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {feature.problem}
                        </p>
                        <div className="flex items-start gap-2.5">
                          <ArrowRight className="size-4 text-primary mt-0.5 shrink-0" />
                          <p className="text-foreground text-sm leading-relaxed flex-1">
                            {feature.solution}
                          </p>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="size-4 text-green-500 mt-0.5 shrink-0" />
                          <p className="text-foreground text-sm leading-relaxed font-medium flex-1">
                            {feature.outcome}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="bg-card text-card-foreground border-input mt-8 rounded-xl border p-10 relative min-h-[450px] shadow-sm">
              {features.map((feature, index) => (
                <TabsContent key={feature.id} value={feature.id} className="absolute inset-0 p-10">
                  <div className="grid lg:grid-cols-2 gap-10 items-start animate-in fade-in slide-in-from-bottom-4 duration-500 h-full">
                    <div className="flex flex-col gap-5">
                      <div className="space-y-5">
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {feature.problem}
                        </p>
                        <div className="flex items-start gap-3.5 bg-primary/5 rounded-lg p-4 border border-primary/10">
                          <ArrowRight className="size-6 text-primary mt-0.5 shrink-0" strokeWidth={2.5} />
                          <p className="text-foreground text-lg leading-relaxed flex-1 font-medium">
                            {feature.solution}
                          </p>
                        </div>
                        <div className="flex items-start gap-3.5 bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                          <Check className="size-6 text-green-600 dark:text-green-500 mt-0.5 shrink-0" strokeWidth={2.5} />
                          <p className="text-foreground text-lg leading-relaxed font-semibold flex-1">
                            {feature.outcome}
                          </p>
                        </div>
                      </div>
                    </div>
                    {feature.image && (
                      <div className="flex items-center justify-center relative">
                        <div className="blob-primary pointer-events-none absolute -right-12 top-0 size-48 rounded-full opacity-20 blur-3xl dark:opacity-30"></div>
                        <div className="blob-secondary pointer-events-none absolute -left-12 bottom-0 size-40 rounded-full opacity-15 blur-3xl dark:opacity-25"></div>
                        <div className="w-full aspect-4/3 overflow-hidden rounded-lg relative z-10 transition-all duration-300">
                          <img
                            src={feature.image}
                            alt={feature.title}
                            className="h-full w-full object-contain transition-opacity duration-300"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
        <div className="lg:hidden space-y-8">
          {features.map((feature) => (
            <div key={feature.id}>
              <div className="flex gap-3 rounded-lg py-2">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="bg-primary text-primary-foreground flex aspect-square w-10 shrink-0 items-center justify-center rounded-lg shadow-sm">
                      <feature.icon className="size-5" strokeWidth={2.5} />
                    </div>
                    <div className="absolute -top-1 -right-1 bg-background border border-border rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold text-primary">
                      {feature.number}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg">
                    {feature.title}
                  </h3>
                </div>
              </div>
              <div className="bg-card text-card-foreground border-input mt-4 rounded-xl border p-5 shadow-sm">
                <div className="space-y-4">
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {feature.problem}
                  </p>
                  <div className="flex items-start gap-3 bg-primary/5 rounded-lg p-3 border border-primary/10">
                    <ArrowRight className="size-5 text-primary mt-0.5 shrink-0" strokeWidth={2.5} />
                    <p className="text-foreground text-base leading-relaxed flex-1 font-medium">
                      {feature.solution}
                    </p>
                  </div>
                  <div className="flex items-start gap-3 bg-green-500/5 rounded-lg p-3 border border-green-500/10">
                    <Check className="size-5 text-green-600 dark:text-green-500 mt-0.5 shrink-0" strokeWidth={2.5} />
                    <p className="text-foreground text-base leading-relaxed font-semibold flex-1">
                      {feature.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
