import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#1E293B",
        secondary: "#64748B",
        tertiary: "#94A3B8",
        inputBg: "#F1F5F9", // Arka plan için
        green: "#00B500", // Focus border için
      },
      fontSize: {
        "2rem": "2rem",
      },
      lineHeight: {
        primary: "2.421rem",
        secondary: "1.21rem",
        tertiary: "1.059rem",
      },
      gap: {
        "27": "6.75rem",
      },
      maxWidth: {
        form: "27.063rem",
      },
    },
    variants: {
      extend: {
        backgroundColor: ["checked"], // checked için backgroundColor ekle
      },
    },
  },
  plugins: [],
} satisfies Config;
