import cors from "cors";
import express from "express";
import { createHash, randomUUID } from "crypto";


const app = express();

app.use(cors());
app.use(express.json());

const results = [
  {
    id: "result-1",
    wallet: "0x1111111111111111111111111111111111111111",
    experimentId: 1,
    txHash: "0xabc",
    note: "Initial calibration",
  },
  {
    id: "result-2",
    wallet: "0x2222222222222222222222222222222222222222",
    experimentId: 2,
    txHash: "0xdef",
    note: "Follow-up reading",
  },
];


// ================== calculate hash func - *at the back* ================== //
function hashResultPayload({ wallet, experimentId, note }) {
  const canonicalPayload = `${wallet.toLowerCase()}:${experimentId}:${note.trim()}`;

  return createHash("sha256").update(canonicalPayload).digest("hex");
}


app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

// ================== Bug 3 - fixed ================== //
app.get("/api/results/:wallet", (req, res) => {
  
  const wallet = req.params.wallet.toLowerCase();

  const matchingResults = results.filter(
    (result) => result.wallet.toLowerCase() === wallet
  );
  
  res.json({ results: matchingResults });
});


// ================== compare hashes ================== //
app.post("/api/results", (req, res) => {
  
  const { wallet, experimentId, txHash, note, payloadHash } = req.body; // hash we received from the front  
  const expectedHash = hashResultPayload({ wallet, experimentId, note }); // hash we calculated at the back

  // ===== compare the hashs - front & back ===== //
  if (payloadHash !== expectedHash) {
    return res.status(400).json({
      error: "payload hash mismatch",
      expectedFormat: "sha256(wallet:experimentId:note)", // expected format's  hash order
    });
  }


  const saved = {
    id: randomUUID(),
    wallet,
    experimentId,
    txHash,
    note,
  };

  results.push(saved);

  res.status(201).json({ result: saved });
});


app.listen(8787, () => {
  console.log("lab backend running on http://localhost:8787");
});
