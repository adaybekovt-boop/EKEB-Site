import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        elevated: "var(--elevated)",
        accent: "var(--accent)",
        muted: "var(--muted)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "ease-ios": "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        meteor: {
          "0%": {
            transform: "rotate(215deg) translateX(0)",
            opacity: "1",
          },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        "border-spin": {
          "100%": { transform: "rotate(-360deg)" },
        },
        "text-shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "background-shine": {
          "from": { backgroundPosition: "200% 0" },
          "to": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.4s cubic-bezier(0.16,1,0.3,1)",
        "accordion-up": "accordion-up 0.4s cubic-bezier(0.16,1,0.3,1)",
        meteor: "meteor 5s linear infinite",
        "border-spin": "border-spin 6s linear infinite",
        "text-shimmer": "text-shimmer 4s ease-in-out infinite",
        "background-shine": "background-shine 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
