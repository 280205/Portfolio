/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#08080C",
        "ink-light": "#0F0F17",
        surface: "#13131F",
        "surface-alt": "#1A1A2B",
        border: "#24243B",
        "border-light": "#323252",
        text: "#FFFFFF",
        "text-secondary": "#E2E8F0",
        muted: "#94A3B8",
        "muted-dark": "#64748B",
        accent: "#818CF8",
        "accent-purple": "#A855F7",
        "accent-blue": "#3B82F6",
        "accent-dim": "rgba(129, 140, 248, 0.15)",
        "accent-glow": "rgba(168, 85, 247, 0.12)",
        // Keep old names for backward compat
        teal: "#818CF8",
        magenta: "#EC4899",
        amber: "#F59E0B",
      },
      fontFamily: {
        display: ["var(--font-bodoni)", "Bodoni Moda", "serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
