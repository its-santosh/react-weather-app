const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#3d86c6",
        secondary: {
          DEFAULT: "#245494",
          dark: "#1c4484",
          darker : "#113a80",
          light : "#305695",
          lighter :  "#2f5e99"
        },
        mandatory: "#FF0000",
        warning: "#FF9800",
        error: "#F44336",
        success: "#5cb85c",
        neutral: {
          DEFAULT: "#E5E7EB",
          light: "#F3F4F6",
          dark: "#D1D5DB",
          darker: "#808080",
          darkest: "#424242",
        },
      },
      spacing: {
        128: "32rem",
      },
    },
  },
  plugins: [],
  fontFamily: {
    sans: ["ui-sans-serif", "system-ui"],
    serif: ["ui-serif", "Georgia"],
    mono: ["ui-monospace", "SFMono-Regular"],
  },
};
