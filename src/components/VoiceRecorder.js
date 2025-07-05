"use client";

import { useState } from "react";

export default function VoiceRecorder({
  onAudioRecorded,
  isClient,
  transcriptionLoading,
  recordedText,
  setRecordedText,
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

  const startRecording = async () => {
    if (!isClient) return;

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
      setRecordedText(""); // Clear previous text
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const transcribeRecording = async () => {
    if (!audioBlob) return;

    try {
      await onAudioRecorded(audioBlob);
      setAudioBlob(null);
    } catch (error) {
      console.error("Transcription failed:", error);
    }
  };

  return (
    <div className="mb-6">
      <div className="space-y-4">
        {/* Recording Controls */}
        <div className="flex items-center gap-4">
          {!isRecording && !audioBlob && (
            <button
              onClick={startRecording}
              disabled={transcriptionLoading || !isClient}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 bg-canadian-red-100 text-canadian hover:bg-canadian-red-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:scale-105"
              title="Please click me, eh!"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                  clipRule="evenodd"
                />
              </svg>
              {isClient ? "Start Recording" : "Loading..."}
            </button>
          )}

          {isRecording && (
            <button
              onClick={stopRecording}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 bg-red-600 text-white animate-pulse-slow"
            >
              <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
              Stop Recording
            </button>
          )}

          {audioBlob && !isRecording && (
            <button
              onClick={transcribeRecording}
              disabled={transcriptionLoading}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Transcribe Audio
            </button>
          )}
        </div>

        {/* Status Indicators */}
        {isRecording && (
          <div className="flex items-center gap-2 text-red-600">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            Recording... Speak now!
          </div>
        )}

        {audioBlob && !isRecording && !transcriptionLoading && (
          <div className="flex items-center gap-2 text-green-600">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            Audio recorded! Click "Transcribe Audio" to convert to text.
          </div>
        )}

        {transcriptionLoading && (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-canadian"></div>
            Transcribing your speech...
          </div>
        )}

        {/* Recorded Text Display */}
        {recordedText && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700 mb-2 font-medium">
              Transcribed Text:
            </p>
            <p className="text-gray-800">{recordedText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
