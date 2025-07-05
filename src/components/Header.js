import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show Charles every 6 seconds, visible for 2 seconds
    const interval = setInterval(() => {
      setVisible(true);
      const timeout = setTimeout(() => setVisible(false), 2000); // visible for 2 seconds
      return () => clearTimeout(timeout);
    }, 6000); // repeat every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-bold text-red-600">CA</span>
          <span className="text-4xl">🍁</span>
        </div>
        <h1 className="text-3xl font-bold text-canadian">
          Oh Sorry! Politeness Filter
        </h1>
        <div className="flex items-center gap-1">
          <span className="text-4xl">🍁</span>
          <span className="text-2xl font-bold text-red-600">CA</span>
        </div>
      </div>
      <p className="text-gray-600 text-lg">
        Speak or type something direct, and we&apos;ll make it super polite, eh!
      </p>
    </div>
  );
}

export function CharlesPoke() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show Charles every 6 seconds, visible for 2 seconds
    const interval = setInterval(() => {
      setVisible(true);
      const timeout = setTimeout(() => setVisible(false), 2000); // visible for 2 seconds
      return () => clearTimeout(timeout);
    }, 6000); // repeat every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        right: visible ? 0 : -180, // adjust based on image width
        transform: "translateY(-50%)",
        zIndex: 50,
        transition: "right 1s cubic-bezier(.68,-0.55,.27,1.55)",
        pointerEvents: "none",
      }}
    >
      <img
        src="/Charles.png"
        alt="Charles"
        style={{
          width: 180,
          height: "auto",
          borderRadius: "90px 0 0 90px",
          boxShadow: "0 4px 16px #0003",
          transform: "rotate(0deg)",
        }}
      />
    </div>
  );
}
