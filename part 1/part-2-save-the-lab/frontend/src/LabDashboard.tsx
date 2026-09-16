import { FormEvent, useEffect, useState } from "react";
import { loadResults, saveResult, type BackendResult } from "./api";
import { hashResultPayload } from "./crypto";

import {
  getLabContract,
  loadExperiments,
  submitResultOnChain,
  type Experiment,
} from "./web3/labContract";

const DEMO_WALLET = "0x1111111111111111111111111111111111111111";


export function LabDashboard() {

  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [results, setResults] = useState<BackendResult[]>([]);
  const [selectedExperimentId, setSelectedExperimentId] = useState<bigint>(1n);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("idle");

  
// ========================== the second bug - fixed ========================== //
  useEffect(() => {
    async function load() {

      setStatus("loading");

      const contract = await getLabContract();
      const chainExperiments = await loadExperiments(contract);
      const backendResults = await loadResults(DEMO_WALLET);

      setExperiments(chainExperiments);
      setResults(backendResults);
      setStatus("ready");
    }

    load();
  }, []);

  
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setStatus("saving");

    const contract = await getLabContract();

    // =========== wait for the block chain =========== //
    await submitResultOnChain(
      contract,
      selectedExperimentId,
      `ipfs://lab-result/${selectedExperimentId}`,
    );

    // =========== wait for the hash  =========== //
    const payloadHash = await hashResultPayload({
      wallet: DEMO_WALLET,
      experimentId: Number(selectedExperimentId),
      note,
    });

    await saveResult({
      wallet: DEMO_WALLET,
      experimentId: Number(selectedExperimentId),
      txHash: "pending",
      note,
      payloadHash,
    });

    setNote("");
    setStatus("saved");
  }

  return (
    <main className="lab-shell">
      <section className="header">
        <div>
          <p>Research Lab</p>
          <h1>Web3 Experiment Registry</h1>
        </div>
        <span>{status}</span>
      </section>

      <section className="grid">
        <article>
          <h2>Experiments</h2>
          {experiments.map((experiment) => (
            <button
              className="experiment"
              key={experiment.id.toString()}
              onClick={() => setSelectedExperimentId(experiment.id)}
              type="button"
            >
              <strong>{experiment.title}</strong>
              <span>{experiment.active ? "Active" : "Closed"}</span>
            </button>
          ))}
        </article>

        <article>
          <h2>Submit Result</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Result note
              <textarea
                onChange={(event) => setNote(event.target.value)}
                placeholder="Short note for the lab team"
                value={note}
              />
            </label>
            <button type="submit">Submit result</button>
          </form>
        </article>

        <article>
          <h2>Saved Results</h2>
          {results.map((result) => (
            <div className="result" key={result.id}>
              <strong>Experiment {result.experimentId}</strong>
              <p>{result.note}</p>
              <span>{result.wallet}</span>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}
