"use client";

import { useState, useEffect } from "react";

export function useAudioTranscription() {
  const [transcriptionLoading, setTranscriptionLoading] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  const transcribeAudio = async (blob, onTranscriptionComplete) => {
    if (!blob) return;

    setTranscriptionLoading(true);

    try {
      // Convert blob to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Audio = reader.result;

        const response = await fetch("/api/transcribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ audioData: base64Audio }),
        });

        const data = await response.json();

        if (data.success) {
          onTranscriptionComplete(data.text);
          setAudioBlob(null);
        } else {
          throw new Error(data.error || "Failed to transcribe audio");
        }
        setTranscriptionLoading(false);
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setTranscriptionLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    if (audioBlob && !transcriptionLoading) {
      transcribeAudio(audioBlob, (text) => {
        // This will be handled by the parent component
        console.log("Transcription completed:", text);
      });
    }
  }, [audioBlob]);

  return {
    transcriptionLoading,
    setAudioBlob,
    transcribeAudio,
  };
}
