/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ffffff: "#fff",
        d2d2d: "#2d2d2d",
        color: "#757575",
        e9e9e9: "#e9e9e9",
        f19e8: "#8f19e8",
        a445ed: "#a445ed",
        f4f4f4: "#f4f4f4",
      },
      spacing: {},
      fontFamily: {
        "body-s-sans": "Inter",
      },
      borderRadius: {
        "3xs": "10px",
      },
    },
    fontSize: {
      sm: "14px",
      lg: "18px",
      xl: "20px",
      base: "16px",
      "5xl": "24px",
      lgi: "19px",
      "45xl": "64px",
      inherit: "inherit",
    },
    screens: {
      mq1425: {
        raw: "screen and (max-width: 1425px)",
      },
      lg: {
        max: "1200px",
      },
      mq825: {
        raw: "screen and (max-width: 825px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
