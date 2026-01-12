/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        // force light gray border in Tailwind's expected rgb/alpha format
        border: "rgb(229 231 235 / <alpha-value>)", // lighter gray-200 for outlines
        card: "var(--color-card)",
        "card-foreground": "var(--color-card-foreground)",
        muted: "var(--color-muted)",
        "muted-foreground": "var(--color-muted-foreground)",
      },
      borderColor: ({ theme }) => ({
        DEFAULT: theme('colors.border'), // so plain `border` uses light gray
      }),
    },
  },
  plugins: [],
};