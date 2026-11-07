"use client";
import React from "react";
import { 
  TrendingUp, 
  Database, 
  Target, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles,
  Zap
} from "lucide-react";

interface KpiRowProps {
  signalsCount: number;
  memoryCounts: { world?: number; experience?: number; observation?: number; mental_models?: number };
  temprScore: number;
  isAdapted: boolean;
}

export function KpiRow({ 
  signalsCount, 
  memoryCounts, 
  temprScore, 
  isAdapted 
}: KpiRowProps) {
  const totalMemories = (memoryCounts.world || 0) + (memoryCounts.observation || 0) + (memoryCounts.experience || 0);

  const kpis = [
    {
      title: "Competitor Signals Ingested",
      value: signalsCount || 6,
      subtext: "Across 5 channels (Pricing, Outages, Hiring, Lost Deals)",
      change: "+6 Events",
      isPositive: true,
      icon: Target,
      color: "from-blue-500/20 to-indigo-500/10 border-blue-500/20 text-blue-400"
    },
    {
      title: "Hindsight Memory Units",
      value: totalMemories || 20,
      subtext: `${memoryCounts.world || 8} World Facts · ${memoryCounts.observation || 12} Consolidated Observations`,
      change: "Living Memory",
      isPositive: true,
      icon: Database,
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/20 text-emerald-400"
    },
    {
      title: "TEMPR 4-Way Fusion Score",
      value: isAdapted ? `${(temprScore || 0.94) * 100}%` : "0%",
      subtext: isAdapted ? "Semantic + BM25 + Temporal + Re-ranker" : "No memories recalled (Stateless)",
      change: isAdapted ? "High Precision" : "Cold Start",
      isPositive: isAdapted,
      icon: Zap,
      color: isAdapted 
        ? "from-purple-500/20 to-pink-500/10 border-purple-500/20 text-purple-400"
        : "from-slate-800/60 to-slate-800/30 border-slate-700 text-slate-400"
    },
    {
      title: "Margin Defense & Pricing Power",
      value: isAdapted ? "$39/mo (SLA)" : "$22/mo (-35%)",
      subtext: isAdapted ? "85% Gross Margin Protected (No Price War)" : "Margin Dilution from Panic Discounting",
      change: isAdapted ? "+85% Margin" : "-35% Dilution",
      isPositive: isAdapted,
      icon: ShieldCheck,
      color: isAdapted 
        ? "from-teal-500/20 to-emerald-500/10 border-teal-500/20 text-teal-400"
        : "from-red-500/20 to-rose-500/10 border-red-500/20 text-red-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div 
            key={idx}
            className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br p-4 shadow-lg backdrop-blur-sm transition-all ${kpi.color}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">{kpi.title}</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900/60 border border-slate-700/60">
                <Icon className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black tracking-tight text-white">{kpi.value}</span>
              <span 
                className={`flex items-center text-[11px] font-bold ${
                  kpi.isPositive ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {kpi.isPositive ? (
                  <ArrowUpRight className="h-3 w-3 inline mr-0.5" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 inline mr-0.5" />
                )}
                {kpi.change}
              </span>
            </div>

            <p className="mt-1 text-[11px] text-slate-400 line-clamp-1">
              {kpi.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
}
