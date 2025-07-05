"use client";

import { useState, useEffect } from "react";

export default function VoiceRecorder({
  onAudioRecorded,
  isClient,
  transcriptionLoading,
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRecording = async () => {
    if (!isClient) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        onAudioRecorded(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      // You might want to pass this error up to parent component
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={transcriptionLoading || !isClient}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
            isRecording
              ? "bg-canadian text-white animate-pulse-slow"
              : "bg-canadian-red-100 text-canadian hover:bg-canadian-red-200"
          } ${
            transcriptionLoading || !isClient
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {isRecording ? (
            <>
              <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
              Recording...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                  clipRule="evenodd"
                />
              </svg>
              {isClient ? "Start Recording" : "Loading..."}
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
    </div>
  );
}
