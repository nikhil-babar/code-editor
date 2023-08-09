/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "pr-gray": "#333333",
        "se-gray": "#252426",
        "ed-bg": "#353D45",
        "gr-purple":
          "linear-gradient(180deg, #800080 0%, #6A0DAD 100%)",
      },
      borderColor: {
        "neon-blue": "#10E6D7",
        "pr-gray": "#333333",
        "se-gray": "#252426",
      },
    },
  },
  plugins: [],
};
