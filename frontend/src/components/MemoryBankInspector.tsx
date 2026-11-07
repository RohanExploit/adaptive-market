import { TemprVisualizer } from "./TemprVisualizer";

const sections: [string, string][] = [["world", "World facts"], ["experience", "Experience"], ["observation", "Observations"], ["mental_models", "Mental models"]];

export function MemoryBankInspector({ data, tempr }: { data: any; tempr: Record<string, number> }) {
  return (
    <div className="space-y-3 rounded-lg border border-slate-700 bg-slate-900 p-4">
      <h2 className="font-semibold">Live Hindsight Memory Inspector</h2>
      {!data || !data.counts ? <p className="text-sm text-slate-400">Memory bank empty.</p> : sections.map(([k, label]) => (
        <div key={k}>
          <h3 className="text-sm font-semibold text-slate-300">{label} ({data.counts[k]})</h3>
          <ul className="list-disc pl-5 text-xs text-slate-300">{data[k].map((m: string, i: number) => <li key={i}>{m}</li>)}</ul>
        </div>
      ))}
      <TemprVisualizer tempr={tempr} />
    </div>
  );
}
