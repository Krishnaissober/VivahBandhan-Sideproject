/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — deep crimson + warm gold + clean ivory
        brand: {
          red:     '#C0392B',   // primary action color
          redDark: '#962d22',   // hover states
          redSoft: '#FDECEA',   // light tint backgrounds
          gold:    '#D4AC0D',   // accent / badges
          ivory:   '#FDF8F4',   // page background
          charcoal:'#2C2C2C',   // body text
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
