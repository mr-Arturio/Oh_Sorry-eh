import Image from "next/image";

export default function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="flex items-center gap-1">
        <Image
          src="/icons8-canada-48.png"
          alt="Canada"
          width={40}
          height={28}
          style={{ display: "inline-block" }}
        />
          <span className="text-4xl">🍁</span>
        </div>
        <h1 className="text-3xl font-bold text-canadian">
          Oh Sorry, eh! Politeness Filter
        </h1>
        <div className="flex items-center gap-1">
          <span className="text-4xl">🍁</span>
          <Image
          src="/icons8-canada-48.png"
          alt="Canada"
          width={40}
          height={28}
          style={{ display: "inline-block" }}
        />
        </div>
      </div>
      <p className="text-gray-600 text-lg">
        Speak or type something direct, and we'll make it super polite, eh!
      </p>
    </div>
  );
}
