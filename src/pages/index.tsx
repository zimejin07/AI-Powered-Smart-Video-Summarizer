'use client';

import { useState } from 'react';
import TranscriptUpload from '../components/TranscriptUpload';

export default function Home() {
  const [transcript, setTranscript] = useState('');

  return (
    <main className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">🎥 AI Video Summarizer</h1>

      <TranscriptUpload onTranscriptReady={setTranscript} />

      {transcript && (
        <section className="mt-6 p-4 bg-white rounded shadow">
          <h3 className="font-semibold mb-2">📄 Transcript Preview</h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-800 max-h-[300px] overflow-y-scroll">
            {transcript}
          </pre>
        </section>
      )}
    </main>
  );
}
