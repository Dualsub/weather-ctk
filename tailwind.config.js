module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,ts,tsx}",
    "./src/styles/**/*.{html,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}