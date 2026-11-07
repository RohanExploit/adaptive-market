export function TemprVisualizer({ tempr }: { tempr: Record<string, number> }) {
  const keys = Object.keys(tempr);
  if (!keys.length) return null;
  return (
    <div className="space-y-1">
      <h3 className="text-sm font-semibold">TEMPR retrieval scores</h3>
      {keys.map((k) => (
        <div key={k} className="flex items-center gap-2 text-xs">
          <span className="w-16 capitalize">{k}</span>
          <div className="h-2 flex-1 rounded bg-slate-700"><div className="h-2 rounded bg-emerald-400" style={{ width: `${tempr[k] * 100}%` }} /></div>
          <span>{tempr[k].toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}
