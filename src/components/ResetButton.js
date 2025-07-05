export default function ResetButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 bouncy-btn w-full bg-gradient-to-r from-red-200 to-red-300 text-canadian px-6 py-3 rounded-full font-semibold text-lg hover:from-red-300 hover:to-red-400 transition-all duration-200 shadow"
      title="Start over, eh!"
    >
      🔄 Reset
    </button>
  );
}
