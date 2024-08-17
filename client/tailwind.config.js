/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "5rem",
        "7xl": "7rem",
        tiny: "0.7rem",
        huge: "6rem",
      },
      colors: {
        primary: {
          light: "#06D001",
          DEFAULT: "#24ff00",
          dark: "#059212",
        },
        secondary: {
          light: "#A7F3D0",
          DEFAULT: "#34D399",
          dark: "#10B981",
        },
        black: {
          DEFAULT: "#151515",
          light: "#40534C",
          dark: "#000000",
        },
        white: {
          DEFAULT: "#FFFFFF",
          light: "#F7F9F2",
          dark: "#F0EBE3",
        },
        gray: {
          light: "#686D76",
          DEFAULT: "#3C3D37",
          dark: "#1E201E",
        },
        green: {
          DEFAULT: "#399918",
        },
        red: {
          DEFAULT: "#FF0000",
        },
      },
      fontFamily: {
        teko: ["Teko", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
