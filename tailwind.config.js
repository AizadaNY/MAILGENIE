/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/dist/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(214, 32%, 91%)", // Defines 'border-border'
        background: "hsl(220, 14%, 96%)", // Defines 'bg-background'
        foreground: "hsl(222, 47%, 11%)", // ✅ Added 'text-foreground'
      },
    },
  },
  plugins: [],
};
