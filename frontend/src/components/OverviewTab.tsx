"use client";
import React from "react";
import { 
  KpiRow 
} from "./KpiRow";
import { 
  AgentTrackerCard 
} from "./AgentTrackerCard";
import { 
  TrendingUp, 
  Swords, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Target, 
  AlertTriangle,
  Zap,
  Building2
} from "lucide-react";

interface OverviewTabProps {
  strategy: any;
  inspector: any;
  tempr: Record<string, number>;
  signals: any[];
  activeMode: string;
  isAnalyzing: boolean;
  onStateless: () => void;
  onIngest: () => void;
  onAdapted: () => void;
}

export function OverviewTab({
  strategy,
  inspector,
  tempr,
  signals,
  activeMode,
  isAnalyzing,
  onStateless,
  onIngest,
  onAdapted
}: OverviewTabProps) {
  const isAdapted = activeMode === "hindsight";
  const b = strategy?.battlecard;

  return (
    <div className="space-y-6">
      {/* 4 Agent Orchestration Pipeline Tracker */}
      <AgentTrackerCard 
        activeMode={activeMode} 
        isAnalyzing={isAnalyzing} 
        recalledCount={strategy?.recalled || 10} 
      />

      {/* 4 Executive KPI Cards */}
      <KpiRow 
        signalsCount={signals?.length || 6}
        memoryCounts={inspector?.counts || { world: 8, observation: 12, experience: 0, mental_models: 1 }}
        temprScore={tempr?.final || 0.94}
        isAdapted={isAdapted}
      />

      {/* Side-by-Side: The Autonomous "Before vs After" Transformation */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Swords className="h-5 w-5 text-indigo-400" />
            <div>
              <h3 className="text-base font-bold text-white">Autonomous Strategy Evolution: Before vs After Memory</h3>
              <p className="text-xs text-slate-400">
                Notice how the agent transforms from knee-jerk panic discounting into an unshakeable, value-grounded enterprise CSO
              </p>
            </div>
          </div>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
            HackwithHyderabad Core Theme
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left: Stateless Panic Reaction */}
          <div className={`rounded-xl border p-5 transition-all ${
            activeMode === "stateless"
              ? "border-red-500/80 bg-red-950/20 ring-2 ring-red-500/30"
              : "border-slate-800/80 bg-slate-900/40 opacity-75"
          }`}>
            <div className="mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-red-400">
                <ShieldAlert className="h-4 w-4" /> Act 1: Stateless LLM (Zero Memory)
              </span>
              <span className="rounded bg-red-900/40 border border-red-700/50 px-2 py-0.5 text-[10px] font-bold text-red-300">
                Panic Mode
              </span>
            </div>

            <h4 className="text-sm font-bold text-slate-200">
              Reaction to Competitor A Slashes Price by 30%:
            </h4>

            <div className="mt-3 space-y-2.5 text-xs text-slate-300">
              <div className="rounded-lg bg-slate-950/60 p-3 border border-slate-800">
                <span className="font-bold text-red-400 block mb-0.5">Pricing Recommendation:</span>
                <p className="text-slate-300">"Match competitor price cut immediately. Slash price by 35% from $49 to $32/mo to prevent customer churn."</p>
                <span className="text-[10px] text-red-400 font-medium block mt-1">⚠️ Destroys 40% SaaS Gross Margin &amp; sparks destructive race to the bottom</span>
              </div>

              <div className="rounded-lg bg-slate-950/60 p-3 border border-slate-800">
                <span className="font-bold text-red-400 block mb-0.5">Sales Objection Pitch:</span>
                <p className="text-slate-300">"Compare our product features line-by-line. Our UI is modern and user friendly."</p>
                <span className="text-[10px] text-slate-500 font-medium block mt-1">❌ Generic, unconvincing, ignores competitor support collapse</span>
              </div>

              <div className="rounded-lg bg-slate-950/60 p-3 border border-slate-800">
                <span className="font-bold text-red-400 block mb-0.5">Product Backlog Action:</span>
                <p className="text-slate-300">"No action. Backlog priorities remain unchanged (P2/P3)."</p>
                <span className="text-[10px] text-slate-500 font-medium block mt-1">❌ Fails to identify why enterprise deals were lost</span>
              </div>
            </div>

            <button
              onClick={onStateless}
              className="mt-4 w-full rounded-lg border border-red-800/80 bg-red-950/50 py-2 text-xs font-bold text-red-200 hover:bg-red-900/60 transition-all"
            >
              Simulate Act 1 (Stateless Baseline)
            </button>
          </div>

          {/* Right: Hindsight Evolved Strategy */}
          <div className={`rounded-xl border p-5 transition-all ${
            isAdapted
              ? "border-emerald-500/80 bg-emerald-950/20 ring-2 ring-emerald-500/30"
              : "border-slate-800/80 bg-slate-900/40 opacity-75"
          }`}>
            <div className="mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-400">
                <Sparkles className="h-4 w-4" /> Act 3: Hindsight-Adapted Strategy
              </span>
              <span className="rounded bg-emerald-900/40 border border-emerald-700/50 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                Confidence: 0.94
              </span>
            </div>

            <h4 className="text-sm font-bold text-white">
              Self-Adapted Strategy Grounded in 3-Month Memory:
            </h4>

            <div className="mt-3 space-y-2.5 text-xs text-slate-200">
              <div className="rounded-lg bg-slate-950/60 p-3 border border-emerald-900/40">
                <span className="font-bold text-emerald-400 block mb-0.5">Pricing Recommendation:</span>
                <p className="text-slate-200">
                  {b?.pricing_guidance || "Do NOT match the cut. Competitor promos are temporary (B reversed within 60 days). Add a 'Starter Annual' tier at $39/mo with higher limits and 99.99% uptime SLA."}
                </p>
                <span className="text-[10px] text-emerald-400 font-medium block mt-1">✓ Protects 85% gross margin, isolates price shoppers, monetizes reliability</span>
              </div>

              <div className="rounded-lg bg-slate-950/60 p-3 border border-emerald-900/40">
                <span className="font-bold text-emerald-400 block mb-0.5">Sales Objection Pitch:</span>
                <p className="text-slate-200">
                  {b?.recommended_objection_script || "I understand the lower price of Competitor A is attractive, but can you quantify how much a single outage costs your business? We guarantee 99.99% uptime with 24/7 phone + Slack support and an ROI value-matrix."}
                </p>
                <span className="text-[10px] text-emerald-400 font-medium block mt-1">✓ Directly attacks Competitor A's 4 major outages &amp; week-long ticket delays</span>
              </div>

              <div className="rounded-lg bg-slate-950/60 p-3 border border-emerald-900/40">
                <span className="font-bold text-emerald-400 block mb-0.5">Autonomous Backlog Re-ranking:</span>
                <p className="text-slate-200 font-medium">
                  {strategy?.roadmap?.map((r: any) => `${r.priority}: ${r.item}`).join(" · ") || "P0: SOC2 Automation · P1: Native Slack Integration · P1: SLA Dashboard"}
                </p>
                <span className="text-[10px] text-emerald-400 font-medium block mt-1">✓ Recalled 3 lost enterprise deals to B on compliance, boosting SOC2 to P0!</span>
              </div>
            </div>

            <button
              onClick={onAdapted}
              className="mt-4 w-full rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 py-2 text-xs font-bold text-white hover:brightness-110 shadow-lg shadow-emerald-900/30 transition-all"
            >
              Simulate Act 3 (Self-Evolving Morph)
            </button>
          </div>
        </div>
      </div>

      {/* Chronological Market Intelligence Feed */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-400" />
            <div>
              <h3 className="text-base font-bold text-white">Live Competitor Signals Timeline</h3>
              <p className="text-xs text-slate-400">
                Multi-channel market moves ingested and retained into Hindsight memory bank
              </p>
            </div>
          </div>
          <button
            onClick={onIngest}
            className="flex items-center gap-1.5 rounded-lg border border-blue-800 bg-blue-950/50 px-3 py-1.5 text-xs font-semibold text-blue-300 hover:bg-blue-900/60 transition-all"
          >
            <Zap className="h-3.5 w-3.5" /> Re-Seed 3-Mo Signals
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {signals.map((sig, idx) => {
            const catColors: Record<string, string> = {
              pricing: "bg-amber-500/10 text-amber-400 border-amber-500/20",
              reliability: "bg-red-500/10 text-red-400 border-red-500/20",
              "customer-sentiment": "bg-purple-500/10 text-purple-400 border-purple-500/20",
              hiring: "bg-blue-500/10 text-blue-400 border-blue-500/20",
              "win-loss": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
            };

            return (
              <div 
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition-all hover:border-slate-700"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-200">{sig.competitor}</span>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${catColors[sig.category] || "bg-slate-800 text-slate-300"}`}>
                    {sig.category}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white line-clamp-1">{sig.headline}</h4>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-400 line-clamp-2">
                  {sig.content}
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-slate-900 pt-2 text-[10px] text-slate-500">
                  <span>Source: {sig.source}</span>
                  <span className="text-emerald-400 font-semibold">✓ Retained</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
