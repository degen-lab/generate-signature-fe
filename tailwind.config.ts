import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    nextui({
      addCommonColors: true,
      defaultTheme: "light",
      defaultExtendTheme: "dark",
      layout: {},
      themes: {
        light: {
          colors: {
            primary: "#f97316",
          },
        },
        dark: {
          colors: {
            primary: "#f97316",
          },
        },
      },
    }),
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme("fontSize.2xl") },
        h2: { fontSize: theme("fontSize.xl") },
        h3: { fontSize: theme("fontSize.lg") },
      });
    }),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        "10vw": "10vw",
        "15vw": "15vw",
        "20vw": "20vw",
        "25vw": "25vw",
        "30vw": "30vw",
        "35vw": "35vw",
        "40vw": "40vw",
        "45vw": "45vw",
        "50vw": "50vw",
        "55vw": "55vw",
        "60vw": "60vw",
        "65vw": "65vw",
        "70vw": "70vw",
        "75vw": "75vw",
        "80vw": "80vw",
        "85vw": "85vw",
        "90vw": "90vw",
        "95vw": "95vw",
        "100vw": "100vw",
      },
      colors: {
        extend: {
          colors: {
            orange: {
              500: "#f97316",
            },
          },
        },
        primary: {
          light: "#FA5512",
          dark: "#FA5512",
          DEFAULT: "#FA5512",
        },
        secondary: {
          dark: "white",
          light: "black",
          DEFAULT: "black",
        },
      },
    },
  },
  darkMode: "class",
};
export default config;
