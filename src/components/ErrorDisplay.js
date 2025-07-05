export default function ErrorDisplay({ error }) {
  if (!error) return null;

  return (
    <div className="mb-6 bg-canadian-red-50 p-4 rounded-xl border border-canadian-red-200">
      <p className="text-canadian text-sm">{error}</p>
    </div>
  );
}
