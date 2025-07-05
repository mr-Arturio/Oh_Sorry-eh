"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [politeText, setPoliteText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptionLoading, setTranscriptionLoading] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [error, setError] = useState("");

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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setError("");
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError("Please allow microphone access to record audio");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async () => {
    if (!audioBlob) return;

    setTranscriptionLoading(true);
    setError("");

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
          setUserInput(data.text);
          setAudioBlob(null);
        } else {
          setError(data.error || "Failed to transcribe audio");
        }
        setTranscriptionLoading(false);
      };

      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setError("Failed to transcribe audio");
      setTranscriptionLoading(false);
    }
  };

  useEffect(() => {
    if (audioBlob && !transcriptionLoading) {
      transcribeAudio();
    }
  }, [audioBlob]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-canadian-red-50 via-white to-canadian-red-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-3xl shadow-canadian border border-canadian-red-200">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl">🇨🇦</span>
            <h1 className="text-3xl font-bold text-canadian">
              Oh Sorry! Politeness Filter
            </h1>
            <span className="text-4xl">🍁</span>
          </div>
          <p className="text-gray-600 text-lg">
            Speak or type something direct, and we'll make it super polite, eh!
          </p>
        </div>

        {/* Voice Input Section */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={transcriptionLoading}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                isRecording
                  ? "bg-canadian text-white animate-pulse-slow"
                  : "bg-canadian-red-100 text-canadian hover:bg-canadian-red-200"
              } ${transcriptionLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isRecording ? (
                <>
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                  Recording...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Start Recording
                </>
              )}
            </button>

            {transcriptionLoading && (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-canadian"></div>
                Transcribing...
              </div>
            )}
          </div>

          {audioBlob && !transcriptionLoading && (
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <p className="text-green-700 text-sm">
                ✅ Audio recorded! Transcribing...
              </p>
            </div>
          )}
        </div>

        {/* Text Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Or type your message here:
          </label>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Say something direct like 'Move your car' or 'Hurry up'..."
            className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-canadian focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        {/* Transform Button */}
        <div className="mb-6">
          <button
            onClick={handlePoliteness}
            disabled={loading || !userInput.trim()}
            className="w-full bg-gradient-to-r from-canadian to-canadian-red-700 text-white px-6 py-4 rounded-xl font-semibold text-lg hover:from-canadian-red-700 hover:to-canadian-red-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-canadian"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Canadianifying...
              </div>
            ) : (
              "🍁 Canadianify It!"
            )}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-canadian-red-50 p-4 rounded-xl border border-canadian-red-200">
            <p className="text-canadian text-sm">{error}</p>
          </div>
        )}

        {/* Results */}
        {politeText && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🇨🇦</span>
              <h3 className="text-lg font-semibold text-gray-800">
                Your Polite Canadian Version:
              </h3>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-300 mb-4">
              <p className="text-lg font-medium text-gray-800 leading-relaxed">
                "{politeText}"
              </p>
            </div>
            <div className="flex gap-3">
              <button
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                onClick={() => navigator.clipboard.writeText(politeText)}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy to Clipboard
              </button>
              <button
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                onClick={() => {
                  if ("speechSynthesis" in window) {
                    const utterance = new SpeechSynthesisUtterance(politeText);
                    utterance.rate = 0.9;
                    utterance.pitch = 1.1;
                    speechSynthesis.speak(utterance);
                  }
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
                Speak It
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Made with ❤️ for the most Canadian hackathon experience, eh!</p>
        </div>
      </div>
    </main>
  );
}
