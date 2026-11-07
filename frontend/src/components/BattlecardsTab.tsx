"use client";
import React, { useState } from "react";
import { 
  Swords, 
  Copy, 
  Check, 
  ShieldAlert, 
  Sparkles, 
  Target, 
  CheckCircle2, 
  AlertTriangle,
  Brain,
  Quote
} from "lucide-react";

interface BattlecardsTabProps {
  strategy: any;
  onRefresh: () => void;
}

export function BattlecardsTab({ strategy, onRefresh }: BattlecardsTabProps) {
  const [copied, setCopied] = useState(false);
  const [selectedComp, setSelectedComp] = useState("Competitor A");

  const b = strategy?.battlecard;
  const script = b?.recommended_objection_script || "I understand the lower price of Competitor A is attractive, but can you quantify how much a single outage costs your business? We guarantee 99.99% uptime with 24/7 phone + Slack support and an ROI value-matrix.";

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Swords className="h-5 w-5 text-indigo-400" />
            <span>Autonomous Sales Battlecards &amp; Objection Handling</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Sales talk tracks that dynamically rewrite themselves based on competitor outages, churn reviews, and pricing tricks retained in Hindsight.
          </p>
        </div>

        {/* Competitor Selector */}
        <div className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 p-1">
          {["Competitor A", "Competitor B"].map((comp) => (
            <button
              key={comp}
              onClick={() => setSelectedComp(comp)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedComp === comp
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {comp}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Positioning & Target Vulnerability */}
        <div className="space-y-6 lg:col-span-1">
          {/* Target Vulnerability */}
          <div className="rounded-2xl border border-red-500/30 bg-red-950/10 p-5 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-2 text-red-400 mb-3">
              <ShieldAlert className="h-4 w-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Target Competitor Vulnerability</h3>
            </div>
            <p className="text-sm font-bold text-white">
              {b?.key_vulnerability_to_target || "Unreliable service (4 outages) and poor support"}
            </p>
            <div className="mt-3 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>4 Outages in 6 Weeks:</strong> Uptime plummeted to 99.1% immediately following their price cut.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Zero Phone Support:</strong> Week-long ticket backlogs causing active customer churn on Reddit/G2.</span>
              </div>
            </div>
          </div>

          {/* Our Core Positioning */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-5 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-400 mb-3">
              <CheckCircle2 className="h-4 w-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Our Adapted Value Moat</h3>
            </div>
            <p className="text-sm font-bold text-white">
              {b?.our_adapted_positioning || "The reliable, enterprise-grade choice with 99.99% SLA and dedicated support."}
            </p>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              We do not compete in a race to the bottom. We anchor our sales pitch on business continuity guarantees and enterprise SLA credits.
            </p>
          </div>

          {/* Pricing Defense Directive */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-950/10 p-5 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-400 mb-3">
              <Sparkles className="h-4 w-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Pricing Strategy Directive</h3>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {b?.pricing_guidance || "Do NOT match the cut. Competitor promos are temporary (B reversed within 60 days). Add a 'Starter Annual' tier at $39/mo with higher limits and 99.99% uptime SLA."}
            </p>
          </div>
        </div>

        {/* Center & Right Column: Interactive Objection Handling Script & Reflection */}
        <div className="space-y-6 lg:col-span-2">
          {/* Real-time Objection Script */}
          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/10 p-6 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Quote className="h-5 w-5 text-indigo-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Live AI Objection Script (Rep Battlecard)</h3>
                  <p className="text-xs text-indigo-300/80">
                    Scenario: Prospect asks "Why shouldn't we just choose Competitor A for $34/mo?"
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg border border-indigo-500/40 bg-indigo-600/30 px-3 py-1.5 text-xs font-bold text-indigo-200 hover:bg-indigo-600/50 transition-all shadow-sm"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copied!" : "Copy Script"}</span>
              </button>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 shadow-inner">
              <p className="text-sm leading-relaxed text-slate-100 font-medium whitespace-pre-wrap">
                "{script}"
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">Strategy Keys:</span>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-300">Anchor on Outage Cost</span>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-300">99.99% Enterprise SLA</span>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-300">24/7 Slack Channel</span>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-300">ROI Value-Matrix</span>
            </div>
          </div>

          {/* Hindsight Deep Reflection */}
          {strategy?.hindsight_reflection && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="h-4 w-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Hindsight Biomimetic Reflection Synthesis (API reflect)
                </h3>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                {strategy.hindsight_reflection}
              </div>
            </div>
          )}

          {/* Historical Evidence Cited Audit Trail */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Historical Evidence Cited in Hindsight Recall
            </h3>
            <div className="space-y-2">
              {(b?.historical_evidence_cited || [
                "Three prospects churned from Competitor A because of unresponsive support.",
                "Competitor A had 4 major outages in 6 weeks following price cut; uptime fell to 99.1%.",
                "Competitor B discounted 30% six months ago, then raised prices 60 days later."
              ]).map((ev: string, i: number) => (
                <div key={i} className="flex items-start gap-2.5 rounded-lg border border-slate-800/80 bg-slate-950/40 p-2.5 text-xs text-slate-300">
                  <span className="rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px] px-1.5 py-0.5 shrink-0">
                    EV-{i + 1}
                  </span>
                  <span>{ev}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
