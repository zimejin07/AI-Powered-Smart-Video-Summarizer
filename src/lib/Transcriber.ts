// src/lib/Transcriber.ts
let whisperReady = false;

export async function transcribeAudio(blob: Blob): Promise<string> {
  if (!whisperReady) {
    await import('/whisper/whisper.js');
    // @ts-ignore
    await whisper.loadModel('/whisper/whisper-tiny.en.bin');
    whisperReady = true;
  }

  const buffer = await blob.arrayBuffer();
  // @ts-ignore
  const transcript = await whisper.transcribe(new Uint8Array(buffer), 'en');
  return transcript.text || "No text found";
}
