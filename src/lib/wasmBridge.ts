import init, { summarize_text } from '../../wasm-build/pkg';

let initialized = false;

export async function initWasm() {
  if (!initialized) {
    await init();
    initialized = true;
  }
}

export async function getSummary(text: string, count = 3): Promise<string[]> {
  await initWasm();
  return summarize_text(text, count);
}
