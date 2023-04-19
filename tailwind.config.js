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
    plugin(function ({ addComponents, theme }) {
      const divDinamica = {
        ".divDinamica": {
          fontSize: theme("fontSize.sm"),
          color: theme("textColor.gray.100"),
          lineHeight: theme("lineHeight.6"),

          "p, ul": {
            margin: `${theme("spacing.6")} 0`,
          },
          h3: {
            fontSize: theme("fontSize.2xl"),
            lineHeight: theme("lineHeight.loose"),
          },
          iframe: {
            width: theme("width.full"),
            minHeight: "350px",
            padding: `${theme("spacing.2")} 0`,
          },
          "a:hover": {
            color: theme("colors.yellow.500"),
          },
          pre: {
            backgroundColor: theme("colors.gray.700"),
            padding: theme("spacing.1"),
            borderRadius: theme("spacing.4"),
          },
        },
      };

      addComponents(divDinamica);
    }),
  ],
};
