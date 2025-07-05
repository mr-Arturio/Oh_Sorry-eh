"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import VoiceRecorder from "@/components/VoiceRecorder";
import TextInput from "@/components/TextInput";

import ErrorDisplay from "@/components/ErrorDisplay";
import Results from "@/components/Results";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import { useAudioTranscription } from "@/hooks/useAudioTranscription";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [politeText, setPoliteText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [recordedText, setRecordedText] = useState("");

  const { transcriptionLoading, setAudioBlob, transcribeAudio } =
    useAudioTranscription();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePoliteness = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/polite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userInput }),
      });
      const data = await response.json();

      if (data.success) {
        setPoliteText(data.politeText);
      } else {
        setError(data.error || "Failed to transform text");
      }
    } catch (error) {
      console.error("Error getting polite text:", error);
      setError("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  const handleAudioRecorded = async (blob) => {
    try {
      await transcribeAudio(blob, (text) => {
        setRecordedText(text);
        setUserInput(text);
      });
    } catch (error) {
      setError("Failed to transcribe audio");
    }
  };

  if (!isClient) {
    return <LoadingScreen />;
  }

  return (
    <main className="canadian-bg min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating maple leaves */}
      {[...Array(7)].map((_, i) => (
        <img
          key={i}
          src="/maple-leaf-orange.svg"
          alt="Maple Leaf"
          className="floating-leaf"
          style={{
            left: `${10 + i * 12}%`,
            width: `${32 + (i % 3) * 12}px`,
            top: `${-20 - i * 10}px`,
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}
      <div className="max-w-2xl w-full bg-white p-8 rounded-3xl shadow-canadian border border-canadian-red-200 relative z-10">
        <Header />

        <VoiceRecorder
          onAudioRecorded={handleAudioRecorded}
          isClient={isClient}
          transcriptionLoading={transcriptionLoading}
          recordedText={recordedText}
          setRecordedText={setRecordedText}
        />

        <TextInput
          userInput={userInput}
          setUserInput={setUserInput}
          onSubmit={handlePoliteness}
          loading={loading}
        />

        <ErrorDisplay error={error} />

        <Results politeText={politeText} isClient={isClient} />

        <Footer />
      </div>
    </main>
  );
}
