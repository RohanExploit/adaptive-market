"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { OverviewTab } from "@/components/OverviewTab";
import { BattlecardsTab } from "@/components/BattlecardsTab";
import { PricingTab } from "@/components/PricingTab";
import { RoadmapTab } from "@/components/RoadmapTab";
import { MemoryInspectorTab } from "@/components/MemoryInspectorTab";
import { SignalFeedTab } from "@/components/SignalFeedTab";
import { 
  BarChart3, 
  Swords, 
  DollarSign, 
  Layers, 
  Brain, 
  Target,
  Sparkles,
  Info
} from "lucide-react";

const post = (url: string, body?: unknown) =>
  fetch(url, { 
    method: "POST", 
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify(body ?? {}) 
  }).then((r) => r.json());

const get = (url: string) => fetch(url).then((r) => r.json());

export default function Page() {
  const [activeTab, setActiveTab] = useState<"overview" | "battlecards" | "pricing" | "roadmap" | "memory" | "signals">("overview");
  const [strategy, setStrategy] = useState<any>(null);
  const [inspector, setInspector] = useState<any>(null);
  const [signals, setSignals] = useState<any[]>([]);
  const [tempr, setTempr] = useState<Record<string, number>>({});
  const [activeMode, setActiveMode] = useState<string>("hindsight");
  const [busy, setBusy] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const refreshAll = async () => {
    try {
      const [insp, sigs] = await Promise.all([
        get("/api/memory/inspector").catch(() => null),
        get("/api/signals/list").catch(() => null)
      ]);
      if (insp) setInspector(insp);
      if (sigs?.signals) setSignals(sigs.signals);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    // Initial fetch
    refreshAll();
    // Default load adapted strategy
    post("/api/strategy/morph", {
      competitor: "Competitor A",
      scenario_prompt: "Why shouldn't we choose Competitor A?",
      use_memory: true
    }).then((res) => {
      setStrategy(res);
      setTempr(res.tempr ?? {});
    }).catch(() => {});
  }, []);

  const handleStateless = async () => {
    setBusy(true);
    setActiveMode("stateless");
    notify("Simulating Act 1: Competitor A slashes price 30% (Stateless baseline)");
    try {
      const res = await post("/api/strategy/morph", {
        competitor: "Competitor A",
        scenario_prompt: "Why shouldn't we choose Competitor A?",
        use_memory: false
      });
      setStrategy(res);
      setTempr(res.tempr ?? {});
    } catch {
      notify("Error executing stateless strategy simulation.");
    }
    setBusy(false);
  };

  const handleIngest = async () => {
    setBusy(true);
    notify("Act 2: Ingesting 3-month competitor moves and market feedback into Hindsight...");
    try {
      await post("/api/signals/seed");
      await refreshAll();
      notify("Successfully retained 6 signals into Hindsight Bank adaptive-market-prod!");
    } catch {
      notify("Error ingesting signals.");
    }
    setBusy(false);
  };

  const handleAdapted = async () => {
    setBusy(true);
    setActiveMode("hindsight");
    notify("Simulating Act 3: Hindsight TEMPR recall + autonomous strategy mutation");
    try {
      const res = await post("/api/strategy/morph", {
        competitor: "Competitor A",
        scenario_prompt: "Why shouldn't we choose Competitor A?",
        use_memory: true
      });
      setStrategy(res);
      setTempr(res.tempr ?? {});
      await refreshAll();
      notify("Strategy successfully mutated! Battlecard, Pricing, and Roadmap updated.");
    } catch {
      notify("Error running memory-adapted strategy.");
    }
    setBusy(false);
  };

  const handleReset = async () => {
    setBusy(true);
    notify("Resetting demo simulation and local memory cache...");
    try {
      await post("/api/bootstrap", { reset_demo: true });
      setStrategy(null);
      setTempr({});
      setActiveMode("idle");
      await refreshAll();
      notify("Demo environment reset complete.");
    } catch {
      notify("Error resetting demo.");
    }
    setBusy(false);
  };

  const handleIngestCustom = async (signalData: any) => {
    setBusy(true);
    try {
      await post("/api/signals/ingest", signalData);
      await refreshAll();
      notify(`Retained "${signalData.headline}" into Hindsight!`);
    } catch {
      notify("Error retaining custom signal.");
    }
    setBusy(false);
  };

  const tabs = [
    { id: "overview", label: "Executive Overview", icon: BarChart3 },
    { id: "battlecards", label: "Sales Battlecards", icon: Swords },
    { id: "pricing", label: "Pricing & Packaging", icon: DollarSign },
    { id: "roadmap", label: "Roadmap Prioritizer", icon: Layers },
    { id: "memory", label: "Hindsight Memory Bank", icon: Brain },
    { id: "signals", label: "Market Signals Feed", icon: Target },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar
        busy={busy}
        activeMode={activeMode}
        onStateless={handleStateless}
        onIngest={handleIngest}
        onAdapted={handleAdapted}
        onReset={handleReset}
      />

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-indigo-500/40 bg-slate-900/95 px-4 py-3 text-xs font-semibold text-white shadow-2xl shadow-indigo-500/20 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 px-6 py-6 max-w-7xl mx-auto w-full space-y-6">
        {/* Navigation Tabs Bar */}
        <div className="flex overflow-x-auto items-center gap-1.5 border-b border-slate-800 pb-2 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 ring-1 ring-indigo-400"
                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        {activeTab === "overview" && (
          <OverviewTab
            strategy={strategy}
            inspector={inspector}
            tempr={tempr}
            signals={signals}
            activeMode={activeMode}
            isAnalyzing={busy}
            onStateless={handleStateless}
            onIngest={handleIngest}
            onAdapted={handleAdapted}
          />
        )}

        {activeTab === "battlecards" && (
          <BattlecardsTab
            strategy={strategy}
            onRefresh={handleAdapted}
          />
        )}

        {activeTab === "pricing" && (
          <PricingTab />
        )}

        {activeTab === "roadmap" && (
          <RoadmapTab
            strategy={strategy}
          />
        )}

        {activeTab === "memory" && (
          <MemoryInspectorTab
            inspector={inspector}
            tempr={tempr}
            activeBank="adaptive-market-prod"
          />
        )}

        {activeTab === "signals" && (
          <SignalFeedTab
            signals={signals}
            onIngestCustom={handleIngestCustom}
            busy={busy}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 px-6 py-4 text-center text-xs text-slate-500">
        <p>
          AdaptiveMarket · Built for <strong>HackwithHyderabad 3.0</strong> · Powered by{" "}
          <a 
            href="https://github.com/vectorize-io/hindsight" 
            target="_blank" 
            rel="noreferrer" 
            className="text-emerald-400 hover:underline font-semibold"
          >
            Vectorize Hindsight
          </a>{" "}
          and{" "}
          <a 
            href="https://groq.com" 
            target="_blank" 
            rel="noreferrer" 
            className="text-blue-400 hover:underline font-semibold"
          >
            Groq LPU
          </a>
        </p>
      </footer>
    </div>
  );
}
