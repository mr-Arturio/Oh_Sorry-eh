"use client";

export default function Results({ politeText, isClient }) {
  if (!politeText) return null;

  return (
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
            if (isClient && "speechSynthesis" in window) {
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
  );
}
