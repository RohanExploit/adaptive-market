"use client";
import { useState } from "react";
import { SignalFeed } from "../components/SignalFeed";
import { StrategyMorphConsole } from "../components/StrategyMorphConsole";
import { MemoryBankInspector } from "../components/MemoryBankInspector";

const post = (url: string, body?: unknown) =>
  fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body ?? {}) }).then((r) => r.json());

export default function Page() {
  const [strategy, setStrategy] = useState<any>(null);
  const [inspector, setInspector] = useState<any>(null);
  const [tempr, setTempr] = useState<Record<string, number>>({});
  const [log, setLog] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  const note = (m: string) => setLog((l) => [m, ...l].slice(0, 6));
  const refresh = async () => setInspector(await fetch("/api/memory/inspector").then((r) => r.json()));

  async function run(label: string, fn: () => Promise<void>) {
    setBusy(true);
    try { await fn(); note(label); } catch { note(`Error: ${label} (is the backend on :8000?)`); }
    setBusy(false);
  }

  const morph = (useMemory: boolean) => async () => {
    const res = await post("/api/strategy/morph", { competitor: "Competitor A", scenario_prompt: "Why shouldn't we choose Competitor A?", use_memory: useMemory });
    setStrategy(res); setTempr(res.tempr ?? {});
  };

  return (
    <main className="min-h-screen p-4">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">AdaptiveMarket <span className="text-sm font-normal text-slate-400">self-evolving competitive strategy agent · powered by Hindsight</span></h1>
        <button disabled={busy} className="rounded bg-slate-700 px-3 py-1 text-sm" onClick={() => run("Reset demo", async () => { await post("/api/bootstrap", { reset_demo: true }); setStrategy(null); setTempr({}); await refresh(); })}>Reset</button>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        <section className="space-y-4">
          <SignalFeed busy={busy} log={log}
            onStateless={() => run("Act 1: stateless baseline", morph(false))}
            onIngest={() => run("Act 2: ingested 3-month history", async () => { await post("/api/signals/seed"); await refresh(); })}
            onAdapted={() => run("Act 3: memory-adapted strategy", async () => { await morph(true)(); await refresh(); })} />
          <StrategyMorphConsole strategy={strategy} />
        </section>
        <MemoryBankInspector data={inspector} tempr={tempr} />
      </div>
    </main>
  );
}
