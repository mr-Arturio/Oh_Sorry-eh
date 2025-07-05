export default function LoadingScreen() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-canadian-red-50 via-white to-canadian-red-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-3xl shadow-canadian border border-canadian-red-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-canadian mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Canadian Politeness Filter...</p>
        </div>
      </div>
    </main>
  );
}
