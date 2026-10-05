/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FBF7EE",
        chalk: "#EFE8D8",
        ink: "#1D2A1F",
        muted: "#5D6B5F",
        soil: "#6B4A2F",
        orange: {
          DEFAULT: "#F08A00",
          deep: "#D96F00",
          mango: "#FFC15C",
        },
        leaf: {
          DEFAULT: "#1F7A3D",
          fresh: "#3FBF6B",
          forest: "#0F3D22",
        },
        verdict: {
          good: "#1F7A3D",
          goodBg: "#E4F4E8",
          check: "#A86A00",
          checkBg: "#FFF1D6",
          reject: "#B3261E",
          rejectBg: "#FDE6E4",
        }
      },
      fontFamily: {
        serif: ["'Fraunces'", "'Noto Serif Devanagari'", "Georgia", "serif"],
        sans: ["'Noto Sans'", "'Noto Sans Devanagari'", "system-ui", "sans-serif"],
        handwriting: ["'Kalam'", "cursive"],
      },
      boxShadow: {
        'paper': '0 2px 12px -2px rgba(29, 42, 31, 0.08), 0 1px 3px rgba(29, 42, 31, 0.04)',
        'paper-lg': '0 8px 24px -4px rgba(29, 42, 31, 0.12), 0 2px 6px rgba(29, 42, 31, 0.06)',
        'glass': '0 8px 32px 0 rgba(29, 42, 31, 0.15)',
      }
    },
  },
  plugins: [],
}
