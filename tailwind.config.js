/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Canadian theme colors
        "canadian-red": {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        maple: {
          50: "#fef7f0",
          100: "#fdecd8",
          200: "#fbd5b0",
          300: "#f8b87d",
          400: "#f5934a",
          500: "#f27522",
          600: "#e35a18",
          700: "#bc4416",
          800: "#963718",
          900: "#7a3018",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      backgroundImage: {
        "canadian-gradient":
          "linear-gradient(135deg, #dc2626 0%, #fef2f2 50%, #dc2626 100%)",
        "maple-pattern":
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='0.05'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      boxShadow: {
        canadian:
          "0 10px 25px -3px rgba(220, 38, 38, 0.1), 0 4px 6px -2px rgba(220, 38, 38, 0.05)",
        maple:
          "0 20px 25px -5px rgba(242, 117, 34, 0.1), 0 10px 10px -5px rgba(242, 117, 34, 0.04)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },
  plugins: [
    // Custom plugin for Canadian-themed utilities
    function ({ addUtilities, theme }) {
      const newUtilities = {
        ".text-canadian": {
          color: theme("colors.canadian-red.600"),
        },
        ".bg-canadian": {
          backgroundColor: theme("colors.canadian-red.600"),
        },
        ".border-canadian": {
          borderColor: theme("colors.canadian-red.600"),
        },
        ".shadow-canadian": {
          boxShadow: theme("boxShadow.canadian"),
        },
        ".animate-maple": {
          animation: "wiggle 2s ease-in-out infinite",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
