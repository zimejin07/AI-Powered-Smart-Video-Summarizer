// Flag to check if the Whisper model has been loaded and is ready for use
let whisperReady = false;

/**
 * Transcribes audio from a given Blob object using the Whisper library.
 *
 * @param blob - The Blob containing audio data to be transcribed.
 * @returns A Promise that resolves to a string, representing the transcribed text.
 */
export async function transcribeAudio(blob: Blob): Promise<string> {
  // Check if the Whisper model is already loaded and ready
  if (!whisperReady) {
    // Dynamically import the Whisper module/script
    await import("/whisper/whisper.js");
    // Load the specific model required for transcription
    // @ts-ignore: TypeScript cannot verify 'whisper' type due to dynamic import
    await whisper.loadModel("/whisper/whisper-tiny.en.bin");
    // Set the flag to true indicating that the model is now ready
    whisperReady = true;
  }

  // Convert the Blob's contents into an ArrayBuffer (binary buffer)
  const buffer = await blob.arrayBuffer();
  // Transcribe the audio contained in the buffer using the Whisper library
  // @ts-ignore: TypeScript cannot verify 'whisper.transcribe' method due to dynamic import
  const transcript = await whisper.transcribe(new Uint8Array(buffer), "en");
  // Return the transcribed text or a fallback message if no text is found
  return transcript.text || "No text found";
}
