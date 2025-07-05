export default function TextInput({ userInput, setUserInput }) {
  return (
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
  );
}
