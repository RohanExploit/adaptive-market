"use client";
import React, { useState } from "react";
import { 
  Target, 
  Plus, 
  Send, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Sparkles,
  Database
} from "lucide-react";

interface SignalFeedTabProps {
  signals: any[];
  onIngestCustom: (signal: any) => Promise<void>;
  busy: boolean;
}

export function SignalFeedTab({ signals, onIngestCustom, busy }: SignalFeedTabProps) {
  const [competitor, setCompetitor] = useState("Competitor A");
  const [category, setCategory] = useState("pricing");
  const [headline, setHeadline] = useState("");
  const [content, setContent] = useState("");
  const [source, setSource] = useState("web-scrape");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline || !content) return;
    await onIngestCustom({
      competitor,
      category,
      headline,
      content,
      source
    });
    setSuccess(true);
    setHeadline("");
    setContent("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-400" />
          <span>Real-Time Market Signals &amp; Competitor Feed</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Raw competitive intelligence captured from pricing pages, incident reports, job postings, and customer churn calls.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Ingest Custom Signal Form */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm lg:col-span-1">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
            <Plus className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Ingest New Competitor Signal</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Competitor Entity</label>
              <input
                type="text"
                value={competitor}
                onChange={(e) => setCompetitor(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                placeholder="e.g. Competitor A, Stripe, etc."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                >
                  <option value="pricing">Pricing</option>
                  <option value="reliability">Reliability / Outage</option>
                  <option value="customer-sentiment">Customer Sentiment</option>
                  <option value="hiring">Hiring / Expansion</option>
                  <option value="win-loss">Lost Deal</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Source Channel</label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. pricing-page"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Signal Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                placeholder="e.g. Slashed enterprise pricing by 30%"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Detailed Intelligence Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                placeholder="Observed details, user quotes, exact price figures, or incident duration..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 py-2.5 font-bold text-white hover:bg-emerald-500 transition-all shadow-md shadow-emerald-900/30"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Retain into Hindsight</span>
            </button>

            {success && (
              <div className="flex items-center gap-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 p-2 text-emerald-300 text-[11px]">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Successfully retained &amp; consolidated into Hindsight!</span>
              </div>
            )}
          </form>
        </div>

        {/* Signals Timeline */}
        <div className="space-y-3 lg:col-span-2">
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
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-slate-700"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">{sig.competitor}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-[11px] text-slate-400">Source: {sig.source}</span>
                  </div>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${catColors[sig.category] || "bg-slate-800 text-slate-300"}`}>
                    {sig.category}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-100">{sig.headline}</h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">
                  {sig.content}
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <Database className="h-3 w-3" /> In Hindsight Memory Bank
                  </span>
                  <span>Document ID: {sig.document_id || `signal-${idx + 1}`}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
