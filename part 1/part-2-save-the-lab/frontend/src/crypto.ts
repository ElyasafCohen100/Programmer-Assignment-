function bytesToHex(bytes: ArrayBuffer): string {
  return [...new Uint8Array(bytes)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

// ================== Bug 4 - fixed ================== //
export async function hashResultPayload(input: {
  wallet: string;
  experimentId: number;
  note: string;
}): Promise<string> {
  const encoder = new TextEncoder();
  const payload = `${input.wallet.toLowerCase()}:${input.experimentId}:${input.note.trim()}`;
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(payload));

  return bytesToHex(digest);
}
