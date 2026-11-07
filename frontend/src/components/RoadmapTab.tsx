"use client";
import React from "react";
import { 
  Layers, 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Zap,
  TrendingUp
} from "lucide-react";

interface RoadmapTabProps {
  strategy: any;
}

export function RoadmapTab({ strategy }: RoadmapTabProps) {
  const items = [
    {
      name: "SOC2 Type II Automation & Compliance Suite",
      oldPriority: "P2",
      newPriority: "P0",
      status: "Accelerated P0",
      impact: "+28% Enterprise Win Rate",
      trigger: "Lost 3 enterprise deals to Competitor B due to lack of compliance certification.",
      effort: "4 Weeks",
      moat: "Removes enterprise procurement friction against Competitor B."
    },
    {
      name: "Native Slack / Teams War-Room Integration",
      oldPriority: "P2",
      newPriority: "P1",
      status: "Prioritized P1",
      impact: "+15% Daily Active Usage",
      trigger: "Competitor B announced native Slack integration for EMEA enterprise accounts.",
      effort: "2 Weeks",
      moat: "Embedded workflow stickiness in enterprise sales ops."
    },
    {
      name: "Real-Time 99.99% Uptime & SLA Credit Dashboard",
      oldPriority: "P3",
      newPriority: "P1",
      status: "Prioritized P1",
      impact: "+35% Competitive Win Rate vs Comp A",
      trigger: "Competitor A suffered 4 major outages dropping uptime to 99.1% after price cut.",
      effort: "1.5 Weeks",
      moat: "Direct counter-offensive exploiting Competitor A's primary weakness."
    },
    {
      name: "Advanced Multi-Entity Data Export (CSV/JSON/PDF)",
      oldPriority: "P1",
      newPriority: "P2",
      status: "Deprioritized P2",
      impact: "Neutral",
      trigger: "No deal losses attributed to export features; shifted engineering to SOC2.",
      effort: "3 Weeks",
      moat: "Commodity capability."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="h-5 w-5 text-indigo-400" />
          <span>Dynamic Product Roadmap Priority Re-Ranking</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          The agent autonomously mutates the internal engineering backlog by mapping lost enterprise deals and competitor vulnerabilities into priority scorecards.
        </p>
      </div>

      {/* Backlog Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400">
                <th className="py-4 px-5 font-semibold">Product Backlog Capability</th>
                <th className="py-4 px-4 font-semibold text-center">Baseline Priority</th>
                <th className="py-4 px-4 font-semibold text-center text-emerald-400 bg-emerald-950/20 border-x border-emerald-900/30">
                  Adapted Priority
                </th>
                <th className="py-4 px-5 font-semibold">Competitive Trigger &amp; Evidence</th>
                <th className="py-4 px-4 font-semibold">Expected Win-Rate Payoff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {items.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-5 font-bold text-white">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-indigo-400" />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[11px] font-normal text-slate-400 block mt-0.5 ml-4">
                      {item.moat}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center font-mono text-slate-400">
                    <span className="rounded bg-slate-800 px-2.5 py-1 text-slate-400 font-bold">
                      {item.oldPriority}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center bg-emerald-950/10 border-x border-emerald-900/30">
                    <span className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-mono font-black text-xs shadow-sm ${
                      item.newPriority === "P0"
                        ? "bg-emerald-500 text-slate-950 ring-2 ring-emerald-300 animate-pulse"
                        : item.newPriority === "P1"
                        ? "bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold"
                        : "bg-slate-800 text-slate-400"
                    }`}>
                      {item.newPriority === "P0" && <Sparkles className="h-3 w-3" />}
                      {item.newPriority}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-slate-300">
                    <p className="leading-relaxed line-clamp-2">
                      {item.trigger}
                    </p>
                  </td>
                  <td className="py-4 px-4 font-bold text-emerald-400 whitespace-nowrap">
                    {item.impact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rationale Explanation */}
      <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/10 p-6 shadow-xl backdrop-blur-sm">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
          <Sparkles className="h-4 w-4 text-indigo-400" />
          <span>The Memory Mechanism: How Deal Loss Ingestion Alters Engineering Backlogs</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Standard product teams hold monthly roadmap meetings arguing over feature opinions. 
          AdaptiveMarket continuously monitors lost deal transcripts and competitor announcements retained in <strong>Vectorize Hindsight</strong>.
          When three consecutive lost enterprise deals were classified with the reason <em>"Competitor B has SOC2 and we do not"</em>, 
          the agent automatically generated an executive directive raising <strong>SOC2 Automation from P2 to P0</strong>, bypassing months of roadmap inertia.
        </p>
      </div>
    </div>
  );
}
