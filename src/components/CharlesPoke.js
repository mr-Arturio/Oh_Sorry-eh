import { useEffect, useState } from "react";

export default function CharlesPoke() {
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
        left: "50%",
        top: visible ? 0 : -300, // adjust based on image height
        transform: "translateX(-50%)",
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
          borderRadius: "0 0 90px 90px",
          boxShadow: "0 4px 16px #0003",
          transform: "rotate(180deg)",
        }}
      />
    </div>
  );
}
