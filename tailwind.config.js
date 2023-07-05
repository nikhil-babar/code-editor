/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "pr-gray": "#333333",
        "se-gray": "#252426",
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
