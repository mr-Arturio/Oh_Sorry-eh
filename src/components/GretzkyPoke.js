import { useEffect, useState } from "react";

export default function GretzkyPoke() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(true);
      const timeout = setTimeout(() => setVisible(false), 1800); // visible for 1.8 seconds
      return () => clearTimeout(timeout); // cleanup
    }, 4500); // repeat every 4.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: visible ? 0 : -300, 
        bottom: 50,
        zIndex: 50,
        transition: "left 1s cubic-bezier(.68,-0.55,.27,1.55)",
        pointerEvents: "none",
      }}
    >
      <img
        src="/gretzky.png"
        alt="Wayne Gretzky"
        style={{
          width: 150,
          height: "auto",
          borderRadius: "90px 90px 0 0",
          boxShadow: "0 4px 16px #0003",
          transform: "rotate(90deg)",
        }}
      />
    </div>
  );
}
