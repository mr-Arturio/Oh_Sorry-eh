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
import ResetButton from "@/components/ResetButton";
import GretzkyPoke from "@/components/GretzkyPoke";
import CharlesPoke from "@/components/CharlesPoke";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [politeText, setPoliteText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [recordedText, setRecordedText] = useState("");

  const { transcriptionLoading, transcribeAudio } = useAudioTranscription();

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

  const handleReset = () => {
    setPoliteText("");
    setUserInput("");
    setRecordedText("");
  };

  if (!isClient) {
    return <LoadingScreen />;
  }

  const fallingSvgs = [
    "/maple-leaf-orange.svg",
    "/beaver.svg",
    "/hockey.svg",
    "/moose.svg",
    "/maple-2.svg",
  ];

  return (
    <main className="canadian-bg min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <GretzkyPoke />
      <CharlesPoke />
      {[...Array(40)].map((_, i) => {
        // Pick a random SVG for each item
        const svg = fallingSvgs[i % fallingSvgs.length];
        const rotateLeft = i % 2 === 0;
        const duration = 10 + (i % 3) * 4;
        return (
          <img
            key={i}
            src={svg}
            alt="Canadian Symbol"
            className="floating-leaf"
            style={{
              left: `${10 + i * 5}%`,
              width: `${32 + (i % 6) * 18}px`,
              top: `${-20 - i * 30}px`,
              animationDelay: `${i * 2}s`,
              animationName: rotateLeft ? "floatLeafLeft" : "floatLeafRight",
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}

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

        {politeText && <ResetButton onClick={handleReset} />}

        <Footer />
      </div>
    </main>
  );
}
