"use client";
import React from "react";
import { 
  Building2, 
  Brain, 
  Sparkles, 
  Cpu, 
  RotateCcw, 
  Play, 
  Database,
  ShieldCheck,
  Zap,
  TrendingUp
} from "lucide-react";

interface NavbarProps {
  busy: boolean;
  activeMode: string;
  onStateless: () => void;
  onIngest: () => void;
  onAdapted: () => void;
  onReset: () => void;
}

export function Navbar({ 
  busy, 
  activeMode, 
  onStateless, 
  onIngest, 
  onAdapted, 
  onReset 
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-6 py-3.5 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
              <Brain className="h-5 w-5 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-white">
                Adaptive<span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Market</span>
              </span>
              <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                Self-Evolving CSO
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Autonomous Competitive Intelligence &amp; Strategy Agent powered by <span className="font-semibold text-emerald-400">Vectorize Hindsight</span>
            </p>
          </div>
        </div>

        {/* Engine & Status Badges */}
        <div className="hidden xl:flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-slate-300">
            <Database className="h-3.5 w-3.5 text-emerald-400" />
            <span>Bank: <strong className="text-white font-mono">adaptive-market-prod</strong></span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-slate-300">
            <Cpu className="h-3.5 w-3.5 text-blue-400" />
            <span>Engine: <strong className="text-white font-mono">Groq LPU (gpt-oss-120b)</strong></span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-slate-400">
            <span>Target:</span>
            <span className="font-bold text-white">Our Stack</span>
            <span className="text-slate-500">vs</span>
            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[11px] font-medium text-slate-300">Competitor A</span>
            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[11px] font-medium text-slate-300">Competitor B</span>
          </div>
        </div>

        {/* Quick Simulator Triggers */}
        <div className="flex items-center gap-2">
          <button
            disabled={busy}
            onClick={onStateless}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all shadow-sm ${
              activeMode === "stateless"
                ? "bg-red-600 text-white shadow-red-500/30 ring-2 ring-red-400"
                : "border border-red-800/60 bg-red-950/40 text-red-200 hover:bg-red-900/50"
            }`}
          >
            <Play className="h-3.5 w-3.5" />
            <span>Act 1: Stateless</span>
          </button>

          <button
            disabled={busy}
            onClick={onIngest}
            className="flex items-center gap-1.5 rounded-lg border border-blue-800/60 bg-blue-950/40 px-3 py-1.5 text-xs font-semibold text-blue-200 hover:bg-blue-900/50 transition-all shadow-sm"
          >
            <Database className="h-3.5 w-3.5 text-blue-400" />
            <span>Act 2: Ingest 3-Mo Memory</span>
          </button>

          <button
            disabled={busy}
            onClick={onAdapted}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all shadow-lg ${
              activeMode === "hindsight"
                ? "bg-emerald-500 text-slate-950 shadow-emerald-500/30 ring-2 ring-emerald-300"
                : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:brightness-110 shadow-emerald-900/20"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Act 3: Self-Evolving Morph</span>
          </button>

          <button
            disabled={busy}
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
            title="Reset simulation & memory state"
          >
            <RotateCcw className={`h-3.5 w-3.5 ${busy ? "animate-spin" : ""}`} />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
}
