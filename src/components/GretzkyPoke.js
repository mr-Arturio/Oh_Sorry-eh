import { useEffect, useState } from "react";

export default function GretzkyPoke() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show Gretzky every 10 seconds, visible for 3 seconds
    const interval = setInterval(() => {
      setVisible(true);
      const timeout = setTimeout(() => setVisible(false), 2000); // visible for 3 seconds
      return () => clearTimeout(timeout); // cleanup
    }, 4500); // repeat every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: visible ? 0 : -300, // adjust based on image width
        bottom: 40,
        zIndex: 50,
        transition: "left 1s cubic-bezier(.68,-0.55,.27,1.55)",
        pointerEvents: "none",
      }}
    >
      <img
        src="/gretzky.png"
        alt="Wayne Gretzky"
        style={{
          width: 180,
          height: "auto",
          borderRadius: "0 90px 90px 0",
          boxShadow: "0 4px 16px #0003",
          transform: "rotate(90deg)",
        }}
      />
    </div>
  );
}
