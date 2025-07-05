export default function TextInput({
  userInput,
  setUserInput,
  onSubmit,
  loading,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      onSubmit();
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Or type your message here:
      </label>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Say something direct like 'Move your car' or 'Hurry up'..."
          className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-canadian focus:border-transparent resize-none"
          rows={3}
        />
        <button
          type="submit"
          disabled={loading || !userInput.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Processing...
            </div>
          ) : (
            "📝 Submit Text"
          )}
        </button>
      </form>
    </div>
  );
}
