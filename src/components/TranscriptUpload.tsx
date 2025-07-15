"use client";

import { useState } from "react";
import { transcribeAudio } from "../lib/Transcriber";

type Props = {
  onTranscriptReady: (transcript: string) => void;
};

export default function TranscriptUpload({ onTranscriptReady }: Props) {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File | undefined) => {
    // If no file is provided, exit the function early
    if (!file) return;

    // Set the file name for display or processing purposes
    setFileName(file.name);

    // Indicate that a loading process is occurring
    setLoading(true);

    try {
      // Extract the file extension and convert it to lowercase
      const ext = file.name.split(".").pop()?.toLowerCase();

      // Check if the file is a text file
      if (ext === "txt") {
        // Read the text content of the file
        const text = await file.text();
        // Trigger the callback with the text content
        onTranscriptReady(text);
      }
      // Check if the file is an audio file with supported formats
      else if (["mp3", "wav", "webm"].includes(ext || "")) {
        // Transcribe the audio content
        const transcript = await transcribeAudio(file);
        // Trigger the callback with the transcribed text
        onTranscriptReady(transcript);
      }
      // Handle unsupported file types
      else {
        alert(
          "Unsupported file type. Please upload .txt, .mp3, .wav, or .webm"
        );
      }
    } catch (err) {
      // Log any errors that occur during transcription
      console.error("Transcription failed:", err);
      // Inform the user that transcription has failed
      alert("Failed to transcribe the file.");
    }

    // Reset the loading state after processing
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
      {loading && <p className="mt-2 text-sm text-blue-500">Transcribing...</p>}
    </div>
  );
}
