export default function Header() {
  return (
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
  );
}
