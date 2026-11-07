"use client";
import React from "react";
import { 
  DollarSign, 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  X, 
  TrendingUp, 
  Zap, 
  Sparkles,
  Layers,
  Scale
} from "lucide-react";

export function PricingTab() {
  const tiers = [
    {
      feature: "Plan & Price Point",
      our: "$49/mo (or $39/mo Starter Annual)",
      compA: "$34/mo (Slashed from $49) + Free Tier",
      compB: "$69/mo (Raised after 60-day promo)",
      highlight: true
    },
    {
      feature: "Uptime SLA Guarantee",
      our: "99.99% Enterprise SLA with Financial Credits",
      compA: "99.1% (4 major outages in 6 weeks)",
      compB: "99.9% Historical SLA",
      statusOur: true,
      statusA: false,
      statusB: true
    },
    {
      feature: "Customer Support Model",
      our: "Dedicated 24/7 Phone + Shared Slack Channel",
      compA: "Email ticket only (Week-long delays, high churn)",
      compB: "Standard Business Hours Email/Portal",
      statusOur: true,
      statusA: false,
      statusB: true
    },
    {
      feature: "Compliance Certifications",
      our: "SOC2 Type II (P0 Fast-Tracked) + GDPR",
      compA: "Basic GDPR only (No enterprise audits)",
      compB: "SOC2 Type II + Native Slack Integration",
      statusOur: true,
      statusA: false,
      statusB: true
    },
    {
      feature: "Strategic Positioning",
      our: "Mission-Critical Enterprise Strategy Engine",
      compA: "Low-Cost Commodity Tool",
      compB: "Legacy Enterprise Suite",
      statusOur: true,
      statusA: false,
      statusB: true
    },
    {
      feature: "Gross Margin & Financial Moat",
      our: "85% Gross Margin Protected (No Price Wars)",
      compA: "Severe Margin Erosion & Infrastructure Strain",
      compB: "High Margin enterprise contract lock-ins",
      statusOur: true,
      statusA: false,
      statusB: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-emerald-400" />
          <span>Head-to-Head Pricing &amp; Packaging Intelligence Matrix</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Self-calibrating pricing analysis synthesized from 6 months of competitor promotional cycles and retained win/loss reviews.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400">
                <th className="py-4 px-5 font-semibold">Evaluation Dimension</th>
                <th className="py-4 px-5 font-bold text-emerald-400 bg-emerald-950/20 border-x border-emerald-900/30">
                  AdaptiveMarket (Our Stack)
                </th>
                <th className="py-4 px-5 font-semibold text-slate-300">Competitor A (Price Cutter)</th>
                <th className="py-4 px-5 font-semibold text-slate-300">Competitor B (Incumbent)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {tiers.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-5 font-medium text-slate-300 bg-slate-950/40">
                    {row.feature}
                  </td>
                  <td className="py-3.5 px-5 font-bold text-white bg-emerald-950/10 border-x border-emerald-900/30">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>{row.our}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 text-slate-400">
                    <div className="flex items-center gap-2">
                      {row.statusA === false ? (
                        <X className="h-4 w-4 text-red-400 shrink-0" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                      )}
                      <span>{row.compA}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 text-slate-400">
                    <div className="flex items-center gap-2">
                      {row.statusB === true ? (
                        <Check className="h-4 w-4 text-blue-400 shrink-0" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                      )}
                      <span>{row.compB}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategic Pricing Insights */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-6 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-2 text-emerald-400 mb-3">
            <Scale className="h-5 w-5" />
            <h3 className="text-sm font-bold">Why the Agent Refuses to Panic Discount</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Stateless AI agents panic when Competitor A cuts price from $49 to $34, advising founders to match at $32/mo. 
            However, <strong>Vectorize Hindsight memory</strong> recalls two critical cumulative patterns:
          </p>
          <ul className="mt-3 space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">1.</span>
              <span><strong>Competitor B's Precedent:</strong> Competitor B launched the exact same 30% discount promo 6 months ago, struggled with margin compression, and raised prices by 25% within 60 days.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">2.</span>
              <span><strong>Infrastructure Fallout:</strong> Competitor A's price cut surged low-margin free users, causing 4 major outages in 6 weeks and dropping uptime to 99.1%.</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/10 p-6 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-2 text-indigo-400 mb-3">
            <Sparkles className="h-5 w-5" />
            <h3 className="text-sm font-bold">The Evolved Packaging Solution: "Starter Annual"</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Instead of slashing our standard $49/mo list price, the agent autonomously synthesized an optimized packaging defense:
          </p>
          <div className="mt-3 rounded-xl border border-indigo-500/20 bg-slate-950/80 p-4 space-y-2 text-xs text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-white">Tier: "Starter Annual"</span>
              <span className="rounded bg-emerald-500/20 text-emerald-300 font-mono text-[11px] px-2 py-0.5">
                $39/mo (Billed Annually)
              </span>
            </div>
            <p className="text-slate-300">
              Guarantees upfront annual cash collection, locks customer retention for 12 months, and pairs with an explicit <strong>99.99% Uptime SLA</strong> that Competitor A cannot touch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
