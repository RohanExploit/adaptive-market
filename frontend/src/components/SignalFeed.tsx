type Props = { busy: boolean; log: string[]; onStateless: () => void; onIngest: () => void; onAdapted: () => void };

export function SignalFeed({ busy, log, onStateless, onIngest, onAdapted }: Props) {
  const btn = "w-full rounded px-3 py-2 text-left text-sm font-medium disabled:opacity-50";
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
      <h2 className="mb-3 font-semibold">Live Market Signal Feed</h2>
      <div className="space-y-2">
        <button disabled={busy} className={`${btn} bg-red-900/60`} onClick={onStateless}>1 · Competitor A slashes price 30% (stateless baseline)</button>
        <button disabled={busy} className={`${btn} bg-blue-900/60`} onClick={onIngest}>2 · Ingest 3-month competitor history &amp; market feedback</button>
        <button disabled={busy} className={`${btn} bg-emerald-900/60`} onClick={onAdapted}>3 · Prospect asks “Why not Competitor A?” (memory-adapted)</button>
      </div>
      <ul className="mt-3 space-y-1 text-xs text-slate-400">{log.map((l, i) => <li key={i}>• {l}</li>)}</ul>
    </div>
  );
}
