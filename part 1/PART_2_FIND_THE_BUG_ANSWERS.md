# Part 2 - Find The Bug

// ========================================================================================================================== //

### Bug 1 - Loading experiments triggers a wallet transaction

**Issue:**  
`getAllExperiments()` only reads data from the contract, but it was not marked as `view` in Solidity. The frontend also treated the result as a transaction and called `tx.wait()`.

**Fix:**  
Added `view` to `getAllExperiments()` and updated `loadExperiments()` to return the experiments directly without waiting for a transaction.

**Files changed:**  
- `contracts/LabRegistry.sol`
- `frontend/src/web3/labContract.ts`

// ========================================================================================================================== //

### Bug 2 - Experiments keep reloading and duplicating

**Issue:**  
The `useEffect` depended on `experiments` while also updating `experiments`, causing the effect to run repeatedly. In addition, each load appended the full list of experiments to the existing state, creating duplicates.

**Fix:**  
Changed the dependency array to `[]` so the initial data loads once, and replaced the experiments state with the full list returned from the contract instead of appending it.

`setExperiments([...experiments, ...chainExperiments]);` => `setExperiments(chainExperiments);`

**File changed:**  
- `frontend/src/LabDashboard.tsx`

// ========================================================================================================================== //

### Bug 3 - Backend result filtering

**Issue:**  
The backend should return only the results that belong to the requested wallet.

Inside the filter, the code used `result.wallet = wallet`. This changed the wallet of every result instead of checking if it matched the requested wallet.

Because of this, all results passed the filter and the original wallet values were also changed.

**Fix:**  
Removed the incorrect assignment. No additional comparison line was needed because the `return` statement already compares each result's wallet with the requested wallet.

Now the filter returns only the matching results without changing the original data.

**File changed:**  
- `backend/server.js`

// ========================================================================================================================== //

### Bug 4 - Payload hash mismatch

**Issue:**  
The frontend and backend created the payload string in a different order before calculating the SHA-256 hash.

The frontend used `experimentId:wallet:note`, while the backend expected `wallet:experimentId:note`. Because the strings were different, they produced different hashes and the backend could reject the result with a payload hash mismatch.

**Fix:**  
Changed the frontend payload order to `wallet:experimentId:note`, so both the frontend and backend calculate the hash from the same string.

**File changed:**  
- `frontend/src/crypto.ts`

// ========================================================================================================================== //

### Bug 5 - Smart Contract

**Issue:**  
`getResultCount()` was missing `view`.

Also, `submitResult()` saved the result without checking if the experiment exists or if it is active.

**Fix:**  
I added `view` to `getResultCount()`.

I also added two checks before saving the result:
- The experiment exists.
- The experiment is active.

**File changed:**  
- `contracts/LabRegistry.sol`

// ========================================================================================================================== //

### Bug 6 - Encoded ABI does not match the Smart Contract

**Issue:**  
The encoded ABI did not match the updated Solidity contract.

After decoding the ABI, I found that `getAllExperiments()` and `getResultCount()` were still defined without `view`, even though both functions only read data from the contract.

Because the frontend uses this ABI through ethers to interact with the Smart Contract, the ABI must correctly describe the contract functions.

**Fix:**  
I decoded the Base64 ABI - using `console.log(decodeLabRegistryAbi());` - and compared it with `LabRegistry.sol`.

The decoded ABI contained:

```text
function getAllExperiments() public returns (...)
function getResultCount() external returns (uint256)
```

I updated them to:

```text
function getAllExperiments() public *view* returns (...)
function getResultCount() external *view* returns (uint256)
```

I then created the corrected ABI array in Node.js and encoded it back to Base64:

```js
const abi = [
  "function getAllExperiments() public view returns (tuple(uint256 id,string title,address owner,bool active)[])",
  "function getResultCount() external view returns (uint256)",
  "function submitResult(uint256 experimentId, string metadataUri) external",
  "event ResultSubmitted(address indexed researcher,uint256 indexed experimentId,string metadataUri,uint256 createdAt)"
];

Buffer.from(JSON.stringify(abi)).toString("base64");
```

Finally, I replaced the old Base64 value in `encodedAbi.ts` and decoded it again to verify that the ABI now matches the Solidity contract.

**File changed:**  
- `frontend/src/web3/encodedAbi.ts`

// ========================================================================================================================== //

### Bug 7 - Backend save is not awaited

**Issue:**  
`saveResult()` is an async function, but `handleSubmit()` did not wait for it to finish.

Because of this, the UI could show the status as `"saved"` before the backend actually finished saving the result.

**Fix:**  
Added `await` before `saveResult()` so the UI continues only after the backend save operation finishes successfully.

```ts
await saveResult({
  wallet: DEMO_WALLET,
  experimentId: Number(selectedExperimentId),
  txHash: "pending",
  note,
  payloadHash,
});

**File changed:**  
- `frontend/src/LabDashboard.tsx`

// ========================================================================================================================== //

