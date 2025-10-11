export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        sand: "#f4efe9",
        ink: "#0f172a",
        tea: "#6bb5a2",
        sun: "#ffd166",
        royal: "#2643A0"
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        sans: ["'Poppins'", "ui-sans-serif", "system-ui"]
      },
      boxShadow: { soft: "0 10px 30px rgba(0,0,0,0.08)" }
    },
  },
  plugins: [],
};
