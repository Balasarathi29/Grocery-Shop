/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2fbf6",
          100: "#d7f4e1",
          200: "#afe8c4",
          300: "#84daa4",
          400: "#5fc887",
          500: "#3cad6c",
          600: "#2f8e58",
          700: "#276f47",
          800: "#22593b",
          900: "#1d4a32",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Manrope", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(29, 74, 50, 0.12)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-7px)" },
        },
        riseIn: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        floaty: "floaty 4s ease-in-out infinite",
        riseIn: "riseIn .6s ease-out both",
      },
    },
  },
  plugins: [],
};
