"use client";
import React from "react";
import { 
  Search, 
  Database, 
  Cpu, 
  Swords, 
  CheckCircle2, 
  Clock, 
  Loader2, 
  ArrowRight,
  ShieldAlert,
  Sparkles
} from "lucide-react";

interface AgentTrackerCardProps {
  activeMode: string;
  isAnalyzing: boolean;
  recalledCount: number;
}

export function AgentTrackerCard({ 
  activeMode, 
  isAnalyzing, 
  recalledCount 
}: AgentTrackerCardProps) {
  const isAdapted = activeMode === "hindsight";
  const isStateless = activeMode === "stateless";

  const agents = [
    {
      id: "AGT-01",
      name: "1. Market Signal Watcher",
      icon: Search,
      role: "Scrapes competitor pricing, outage logs, EMEA hiring, and deal loss patterns",
      status: isAnalyzing ? "running" : (isAdapted || isStateless ? "completed" : "idle"),
      latency: isAdapted ? "124ms" : (isStateless ? "82ms" : "-"),
      message: isAdapted 
        ? "Ingested 6 multi-channel signals (Pricing, Status Page, Lost Deals, G2)." 
        : (isStateless ? "Isolated signal parsed without historical context." : "Awaiting competitor move simulation...")
    },
    {
      id: "AGT-02",
      name: "2. Hindsight Memory Bank",
      icon: Database,
      role: "Biomimetic retention, temporal indexing, and background observation consolidation",
      status: isAnalyzing ? "running" : (isAdapted ? "completed" : (isStateless ? "bypassed" : "idle")),
      latency: isAdapted ? "210ms" : "-",
      message: isAdapted 
        ? "Retained into Bank adaptive-market-prod. Consolidated 12 behavioral observations." 
        : (isStateless ? "Memory bypassed! Operating in pure zero-shot mode." : "5-layer biomimetic memory bank standby.")
    },
    {
      id: "AGT-03",
      name: "3. TEMPR Neural Retriever",
      icon: Cpu,
      role: "4-way fusion: Semantic (0.59) + Keyword BM25 (0.06) + Temporal + Re-ranker",
      status: isAnalyzing ? "running" : (isAdapted ? "completed" : (isStateless ? "zero-hits" : "idle")),
      latency: isAdapted ? "188ms" : "-",
      message: isAdapted 
        ? `Recalled ${recalledCount || 10} verified memory units with 0.94 fusion confidence.` 
        : (isStateless ? "0 memories recalled (cold-start baseline)." : "Ready for cross-temporal queries.")
    },
    {
      id: "AGT-04",
      name: "4. Strategy Mutation Agent",
      icon: Swords,
      role: "Self-adapts sales objection scripts, locks pricing tiers, and re-ranks roadmap P0",
      status: isAnalyzing ? "running" : (isAdapted ? "completed" : (isStateless ? "panic-mode" : "idle")),
      latency: isAdapted ? "340ms" : (isStateless ? "110ms" : "-"),
      message: isAdapted 
        ? "Strategy autonomously morphed! SLA guaranteed, Starter Annual $39/mo, SOC2 P0." 
        : (isStateless ? "Panic reaction: Recommended matching 35% discount and eroding margins." : "Standing by to mutate GTM directives.")
    }
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl backdrop-blur-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Autonomous Agent Orchestration Pipeline</h3>
            <p className="text-[11px] text-slate-400">
              Coordinated pipeline executing signal capture, Hindsight memory recall, and tactical strategy mutation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Execution State:</span>
          {isAnalyzing ? (
            <span className="flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 px-2.5 py-0.5 font-semibold text-blue-400">
              <Loader2 className="h-3 w-3 animate-spin" /> Running Pipeline
            </span>
          ) : isAdapted ? (
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 font-semibold text-emerald-400">
              <CheckCircle2 className="h-3 w-3" /> Fully Adapted
            </span>
          ) : isStateless ? (
            <span className="flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 font-semibold text-amber-400">
              <ShieldAlert className="h-3 w-3" /> Stateless (No Memory)
            </span>
          ) : (
            <span className="flex items-center gap-1.5 rounded-full bg-slate-800 px-2.5 py-0.5 font-medium text-slate-400">
              Standby
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {agents.map((agent) => {
          const Icon = agent.icon;
          const isRunning = agent.status === "running";
          const isDone = agent.status === "completed";
          const isBypassed = agent.status === "bypassed" || agent.status === "zero-hits";
          const isPanic = agent.status === "panic-mode";

          return (
            <div 
              key={agent.id}
              className={`flex flex-col justify-between rounded-xl border p-3.5 transition-all ${
                isDone
                  ? "border-emerald-500/30 bg-emerald-950/10"
                  : isPanic
                  ? "border-red-500/30 bg-red-950/10"
                  : isBypassed
                  ? "border-amber-500/30 bg-amber-950/10"
                  : isRunning
                  ? "border-blue-500/40 bg-blue-950/20 shadow-md shadow-blue-500/10"
                  : "border-slate-800 bg-slate-900/40"
              }`}
            >
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-800 text-slate-300">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-200">{agent.id}</span>
                  </div>
                  
                  {isRunning && (
                    <Loader2 className="h-3.5 w-3.5 text-blue-400 animate-spin" />
                  )}
                  {isDone && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  )}
                  {isPanic && (
                    <span className="text-[10px] font-bold text-red-400">PANIC</span>
                  )}
                  {isBypassed && (
                    <span className="text-[10px] font-bold text-amber-400">BYPASS</span>
                  )}
                </div>

                <h4 className="text-xs font-bold text-white">{agent.name}</h4>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-400 line-clamp-2">
                  {agent.role}
                </p>
              </div>

              <div className="mt-3 border-t border-slate-800/80 pt-2">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Latency: <strong className="text-slate-200">{agent.latency}</strong></span>
                  <span className="capitalize text-slate-400 font-medium">{agent.status}</span>
                </div>
                <p className="mt-1 text-[10.5px] font-medium leading-tight text-slate-300">
                  {agent.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
