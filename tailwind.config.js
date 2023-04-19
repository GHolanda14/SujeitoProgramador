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
    plugin(function ({ addComponents, addBase, theme }) {
      const botao = {
        button: {
          fontSize: theme("fontSize.xl"),
          backgroundColor: theme("colors.yellow.500"),
        },
      };

      addBase(botao);

      const divDinamica = {
        ".divDinamica": {
          fontSize: theme("fontSize.sm"),
          color: theme("textColor.gray.100"),
          lineHeight: theme("lineHeight.6"),

          "p, ul": {
            margin: "1.5rem 0",
          },
          iframe: {
            width: "100%",
            minHeight: "350px",
            padding: "0.5rem 0",
          },
          "a:hover": {
            color: theme("colors.yellow.500"),
          },
          pre: {
            backgroundColor: "#15171B",
            padding: "0.25rem",
            borderRadius: "1rem",
          },
        },
      };
      const components = {
        button: {
          "&:hover": {
            backgroundColor: theme("colors.blue.900"),
          },
        },
        ".post": {
          display: "flex",
          flexDirection: "column",
          marginTop: "3.5rem",
          alignItems: "center",
        },
      };
      addComponents(components);
      addComponents(divDinamica);
    }),
  ],
};
