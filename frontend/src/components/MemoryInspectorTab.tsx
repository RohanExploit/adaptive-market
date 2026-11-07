"use client";
import React from "react";
import { 
  Database, 
  Brain, 
  Cpu, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  Layers,
  Search,
  Clock
} from "lucide-react";
import { TemprVisualizer } from "./TemprVisualizer";

interface MemoryInspectorTabProps {
  inspector: any;
  tempr: Record<string, number>;
  activeBank: string;
}

export function MemoryInspectorTab({ 
  inspector, 
  tempr, 
  activeBank 
}: MemoryInspectorTabProps) {
  const counts = inspector?.counts || { world: 8, observation: 12, experience: 0, mental_models: 1 };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Brain className="h-5 w-5 text-emerald-400" />
            <span>Vectorize Hindsight 5-Layer Biomimetic Memory Bank</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time inspection of active memories, autonomous observations, and TEMPR 4-way neural retrieval scores.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-1.5 text-xs text-emerald-300">
          <Database className="h-4 w-4 text-emerald-400" />
          <span>Active Bank: <strong className="font-mono text-white">{activeBank || "adaptive-market-prod"}</strong></span>
        </div>
      </div>

      {/* TEMPR Retrieval Visualizer Card */}
      <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/10 p-6 shadow-xl backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between border-b border-indigo-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-indigo-400" />
            <div>
              <h3 className="text-sm font-bold text-white">TEMPR 4-Way Neural Retrieval &amp; Cross-Encoder Reranker</h3>
              <p className="text-xs text-indigo-300/80">
                Fuses Semantic Vector Search, BM25 Keyword Search, Knowledge Graph, and Temporal Recency Decay
              </p>
            </div>
          </div>
          <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-[11px] font-bold text-indigo-300">
            Hindsight Patent-Pending Architecture
          </span>
        </div>

        <TemprVisualizer tempr={tempr} />
      </div>

      {/* 4 Memory Layers Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Consolidated Observations */}
        <div className="rounded-2xl border border-purple-500/30 bg-purple-950/10 p-6 shadow-xl backdrop-blur-sm">
          <div className="mb-3 flex items-center justify-between border-b border-purple-500/20 pb-2">
            <div className="flex items-center gap-2 text-purple-400">
              <Sparkles className="h-4 w-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider">
                Consolidated Observations ({counts.observation || 12})
              </h3>
            </div>
            <span className="text-[10px] text-purple-300 font-semibold bg-purple-500/20 px-2 py-0.5 rounded">
              Synthesized by Hindsight
            </span>
          </div>

          <p className="text-[11px] text-slate-400 mb-3">
            Hindsight continuously processes raw events in the background to form higher-level behavioral deductions:
          </p>

          <ul className="space-y-2 text-xs text-slate-300">
            {(inspector?.observation || [
              "Competitor A is sacrificing support quality for market share (confidence 0.94).",
              "Competitor A had week-long ticket delays and no phone support.",
              "Competitor A experienced 4 major outages in the 6 weeks following a price cut.",
              "Competitor A's uptime fell to 99.1% between September 26 and November 7, 2026.",
              "Competitor B offered a 30% discount on their products then raised prices.",
              "The company lost three enterprise deals to Competitor B because Competitor B has SOC2 compliance.",
              "Competitor B announced SOC2 compliance and native Slack integration on 2026-11-07.",
              "Competitor B hired 10 enterprise sales representatives in EMEA."
            ]).map((obs: string, i: number) => (
              <li key={i} className="flex items-start gap-2 rounded-lg bg-slate-950/40 p-2.5 border border-purple-900/20">
                <CheckCircle2 className="h-3.5 w-3.5 text-purple-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{obs}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* World Facts */}
        <div className="rounded-2xl border border-blue-500/30 bg-blue-950/10 p-6 shadow-xl backdrop-blur-sm">
          <div className="mb-3 flex items-center justify-between border-b border-blue-500/20 pb-2">
            <div className="flex items-center gap-2 text-blue-400">
              <Database className="h-4 w-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider">
                World Facts ({counts.world || 8})
              </h3>
            </div>
            <span className="text-[10px] text-blue-300 font-semibold bg-blue-500/20 px-2 py-0.5 rounded">
              Raw Extracted Events
            </span>
          </div>

          <p className="text-[11px] text-slate-400 mb-3">
            Objective market events extracted from competitor landing pages, status feeds, and job boards:
          </p>

          <ul className="space-y-2 text-xs text-slate-300 max-h-[380px] overflow-y-auto pr-1">
            {(inspector?.world || [
              "Competitor A reduced the price of their Pro plan from $49 to $34 per month and introduced a free tier. | When: August 2026",
              "Competitor A experienced 4 major outages in the 6 weeks following a price cut, resulting in uptime falling to 99.1%.",
              "Three prospects churned from Competitor A because of unresponsive support and week-long delays.",
              "Competitor B announced SOC2 compliance and native Slack integration. | When: 2026-11-07",
              "Competitor B hired 10 enterprise sales representatives in EMEA.",
              "The company lost three enterprise deals to Competitor B because Competitor B has SOC2 compliance."
            ]).map((fact: string, i: number) => (
              <li key={i} className="flex items-start gap-2 rounded-lg bg-slate-950/40 p-2.5 border border-blue-900/20">
                <span className="text-blue-400 font-mono text-[10px] px-1 py-0.5 rounded bg-blue-500/10 shrink-0">
                  FACT
                </span>
                <span className="leading-relaxed text-[11.5px]">{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pinned Mental Models */}
      <div className="rounded-2xl border border-teal-500/30 bg-teal-950/10 p-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-2 text-teal-400 mb-2">
          <Brain className="h-4 w-4" />
          <h3 className="text-xs font-bold uppercase tracking-wider">
            Active Mental Model: Live Competitive Landscape &amp; GTM Strategy Directives
          </h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          <strong>Source Query:</strong> <em>"What are our primary competitors' current pricing tiers, recent feature rollouts, known product weaknesses, and our optimal positioning strategy against each?"</em>
        </p>
        <div className="mt-3 rounded-xl border border-teal-500/20 bg-slate-950/60 p-4 text-xs text-slate-200">
          <p className="font-medium">
            "Promos from Competitor B are temporary flash discounts reversed within 60 days. Competitor A is experiencing severe operational strain (4 major outages, 99.1% uptime, zero phone support) following their free tier launch. We lack SOC2 compliance, which is our #1 enterprise deal-loss driver."
          </p>
        </div>
      </div>
    </div>
  );
}
