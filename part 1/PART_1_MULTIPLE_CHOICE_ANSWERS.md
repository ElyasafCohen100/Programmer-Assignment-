// ============================================================================================================== //

## Question 1

**Answer: A**

**Explanation:**  
The API call is not awaited, so the code continues immediately to `setStatus("saved")` without waiting to know whether the save operation succeeded or failed.

**Suggested fix: (Mainly for me..)**

```ts
async function saveResearchNote(note: ResearchNote) {
  setStatus("saving");

  try {
    await api.saveNote(note);
    setStatus("saved");
  } 
  catch (error) {
    setStatus("failed");
  }
}

// ============================================================================================================== //

## Question 2

**Answer: B**

**Explanation:**  
The Solidity function only reads and returns the experiments without modifying the blockchain state, so it should be marked as `view`. Without `view`, the call may be treated as a transaction instead of a read-only call, which causes the wallet to request transaction approval.

The frontend also incorrectly treats the returned value as a transaction by calling `tx.wait()`. A read-only call should return the experiments directly.

**Suggested fix: (Mainly for me..)**

```solidity
function getAllExperiments() public *view* returns (Experiment[] memory) {
    return experiments;
}
```

// ============================================================================================================== //

## Question 3

**Answer: B**

**Explanation:**  
The original endpoint trusts the wallet address provided in the URL without verifying that the authenticated user is allowed to access that wallet's results.

The fix identifies the authenticated user, compares the user's wallet with the requested wallet, and returns `403` if they do not match. The database query then uses the authenticated user's wallet instead of trusting the wallet address supplied by the client.

**Suggested fix:**

```ts
const user = requireUser(req);

if (user.wallet.toLowerCase() !== req.params.wallet.toLowerCase()) {
  return res.status(403).end();
}

const results = await db.results.findMany({
  where: { wallet: user.wallet },
});

res.json(results);

// ============================================================================================================== //

## Question 4

**Answer: B**

**Explanation:**
The original code changes the existing state directly and then sends the same array back to `setExperiments`. Because it is still the same array, React may not detect the change and re-render the UI.

Option B creates a new array with `map` and a new object for the experiment that changed. This allows React to detect the new state and update the UI correctly.

**Suggested fix:**

```tsx
function markCompleted(id: string) {
  setExperiments((prev) =>
    prev.map((experiment) =>
      experiment.id === id
        ? { ...experiment, status: "completed" }
        : experiment,
    ),
  );
}```

// ============================================================================================================== //
