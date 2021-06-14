module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        monument: ["Monument", "system-ui"],
        general: ["General", "system-ui"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
