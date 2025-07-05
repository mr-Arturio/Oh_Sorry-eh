export default function TransformButton({ onClick, loading, disabled }) {
  return (
    <div className="mb-6">
      <button
        onClick={onClick}
        disabled={disabled}
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
  );
}
