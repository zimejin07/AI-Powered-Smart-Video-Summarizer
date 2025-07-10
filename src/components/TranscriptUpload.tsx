'use client';

import { useState } from 'react';
import { transcribeAudio } from '../lib/Transcriber';

type Props = {
  onTranscriptReady: (transcript: string) => void;
};

export default function TranscriptUpload({ onTranscriptReady }: Props) {
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;
    setFileName(file.name);
    setLoading(true);

    try {
      const ext = file.name.split('.').pop()?.toLowerCase();

      if (ext === 'txt') {
        const text = await file.text();
        onTranscriptReady(text);
      } else if (['mp3', 'wav', 'webm'].includes(ext || '')) {
        const transcript = await transcribeAudio(file);
        onTranscriptReady(transcript);
      } else {
        alert('Unsupported file type. Please upload .txt, .mp3, .wav, or .webm');
      }
    } catch (err) {
      console.error('Transcription failed:', err);
      alert('Failed to transcribe the file.');
    }

    setLoading(false);
  };

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h2 className="text-lg font-semibold mb-2">Upload Transcript or Audio</h2>
      <input
        type="file"
        accept=".txt,audio/*,video/webm"
        onChange={(e) => handleUpload(e.target.files?.[0])}
        className="block w-full p-2 border rounded"
      />
      {fileName && (
        <p className="mt-2 text-sm text-gray-500">Uploaded: {fileName}</p>
      )}
      {loading && (
        <p className="mt-2 text-sm text-blue-500">Transcribing...</p>
      )}
    </div>
  );
}
