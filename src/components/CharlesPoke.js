import { useEffect, useState } from "react";

export default function CharlesPoke() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(true);
      const timeout = setTimeout(() => setVisible(false), 1500); // visible for 1.5 seconds
      return () => clearTimeout(timeout);
    }, 6000); // repeat every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: visible ? 0 : -400,
        right: 80,
        zIndex: 50,
        transition: "top 1s cubic-bezier(.68,-0.55,.27,1.55)",
        pointerEvents: "none",
      }}
    >
      <img
        src="/Charles.png"
        alt="Charles"
        style={{
          width: 180,
          height: "auto",
          borderRadius: "90px 90px 0 0",
          boxShadow: "0 4px 16px #0003",
          transform: "rotate(180deg)",
        }}
      />
    </div>
  );
}
