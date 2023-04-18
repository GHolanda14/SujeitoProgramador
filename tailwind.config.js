/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      minHeader: "870px",
      lg: "1024px",
      xl: "1280px",
      laptop: "1400px",
      "2xl": "1536px",
    },
    colors: {
      gray: {
        100: "#AFAFAF",
        200: "#525252",
        700: "#15171B",
        900: "#111113",
      },
      blue: {
        900: "#1FA4E5",
      },
      yellow: {
        500: "#FFBE16",
      },
      transparent: "transparent",
      inherit: colors.inherit,
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      emerald: colors.emerald,
      indigo: colors.indigo,
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".post": {
          display: "flex",
          flexDirection: "column",
          marginTop: "3.5rem",
          alignItems: "center",
        },
        ".conteudo-post": {
          display: "flex",
          flexDirection: "column",
          maxWidth: "720px",
          marginTop: "2rem",
          lineHeight: "2rem",
          fontSize: "1.125rem",
        },
        ".conteudo-post h3": {
          fontSize: "1.5rem",
          lineHeight: "2rem",
        },
        ".conteudo-post p,ul": {
          margin: "1.5rem 0",
        },
        ".conteudo-post iframe": {
          width: "100%",
          minHeight: "350px",
          padding: "0.5rem 0",
        },
        ".conteudo-post a:hover": {
          color: "#FFBE16",
        },
        ".conteudo-post pre": {
          backgroundColor: "#15171B",
          padding: "0.25rem",
          borderRadius: "1rem",
        },
      });
    }),
  ],
};
