export function StrategyMorphConsole({ strategy }: { strategy: any }) {
  if (!strategy) return <div className="rounded-lg border border-slate-700 bg-slate-900 p-4 text-sm text-slate-400">Run a scenario to see the strategy.</div>;
  const b = strategy.battlecard;
  const adapted = strategy.mode === "hindsight";
  return (
    <div className={`rounded-lg border p-4 transition-colors ${adapted ? "border-emerald-500 bg-emerald-950/40" : "border-red-500 bg-red-950/30"}`}>
      <div className="mb-2 flex justify-between">
        <h2 className="font-semibold">Strategy Morph Console</h2>
        <span className="text-xs">{adapted ? `Hindsight-adapted · confidence ${strategy.confidence}` : "Stateless (0 memories)"}</span>
      </div>
      <dl className="space-y-2 text-sm">
        <div><dt className="text-slate-400">Positioning</dt><dd>{b.our_adapted_positioning}</dd></div>
        <div><dt className="text-slate-400">Target vulnerability</dt><dd>{b.key_vulnerability_to_target}</dd></div>
        <div><dt className="text-slate-400">Objection script</dt><dd>{b.recommended_objection_script}</dd></div>
        <div><dt className="text-slate-400">Pricing</dt><dd>{b.pricing_guidance}</dd></div>
        <div><dt className="text-slate-400">Roadmap</dt><dd>{strategy.roadmap.map((r: any) => `${r.priority} ${r.item}`).join(" · ")}</dd></div>
        {strategy.hindsight_reflection && (
          <div><dt className="text-slate-400">Hindsight reflection</dt><dd className="whitespace-pre-wrap text-xs">{strategy.hindsight_reflection}</dd></div>
        )}
        {b.historical_evidence_cited.length > 0 && (
          <div><dt className="text-slate-400">Evidence</dt><dd><ul className="list-disc pl-5">{b.historical_evidence_cited.map((e: string, i: number) => <li key={i}>{e}</li>)}</ul></dd></div>
        )}
      </dl>
    </div>
  );
}
