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
        background: "#F8FAFC",
        foreground: "#FFFFFF",
        primary: "#1E293B",
        secondary: "#64748B",
        tertiary: "#94A3B8",
        inputBg: "#F1F5F9", // Arka plan için
        green: "#00B500", // Focus border için
        black: "#000000",
        gray: "#626262",
		customBorder:"#E2E8F0",
		detailBg:"#F2F2F2",
		"gray-custom-1":"#888888",
		"gray-custom-2":"#C0C0C0",
		"gray-custom-3":"#8D8D8D",
		"black-custom-1":"#1E1E21",
      },
      fontSize: {
        "2rem": "2rem",
		"2.5rem": "2.5rem",
      },
      lineHeight: {
        primary: "2.421rem",
        secondary: "1.21rem",
        tertiary: "1.059rem",
		"13": "3.438rem",
		"1.875": "1.875rem",
		"custom-22": "1.375rem",

      },
      gap: {
        "27": "6.75rem",
		"custom-10": "0.625rem",
		"custom-9": "0.563rem",
		"custom-7": "0.438rem",
      },
      maxWidth: {
        form: "27.063rem",
      },
	  width: {
		"145": "9.063rem",
	  },
      fontFamily: {
        inter: ["inter", "sans-serif"],
        poppins: ["poppins", "sans-serif"],
        roboto: ["roboto", "sans-serif"],
      },
	  borderWidth: {
		"0.5": "0.5px",
		"1": "1px",
		"1-5": "1.5px",
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
