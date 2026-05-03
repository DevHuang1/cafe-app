// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Primary café palette
        primary: {
          DEFAULT: "#6B4226", // main brown
          light: "#8B5E3C",
          dark: "#4B2E1E",
        },

        // Background tones
        bg: {
          main: "#F6F4F2", // overall background
          sidebar: "#1E1B18", // dark sidebar
          card: "#FFFFFF",
          muted: "#EFEAE6",
        },

        // Text colors
        text: {
          primary: "#2D2A26",
          secondary: "#6B6B6B",
          light: "#FFFFFF",
        },

        // Accent (buttons, highlights)
        accent: {
          DEFAULT: "#C08A5D",
          hover: "#A8744B",
        },

        // Status / UI
        border: "#E5E1DC",
      },

      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },

      boxShadow: {
        soft: "0 2px 8px rgba(0,0,0,0.05)",
        card: "0 4px 12px rgba(0,0,0,0.08)",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      backgroundImage: {
        "btn-gradient": "linear-gradient(135deg, #6B4226 0%, #8B5E3C 100%)",
      },
    },
  },
  plugins: [],
};
