module.exports = {
    content: [
      "./views/**/*.ejs",
      "./public/**/*.html",
      "./src/**/*.{js,jsx,ts,tsx,vue}",
    ],
    theme: {
      extend: {
        colors: {
          // Define custom colors here
          'primary': '#4f46e5', // Example primary color
          'secondary': '#ec4899', // Example secondary color
        },
        fontFamily: {
          // Define custom font families here
          'sans': ['ui-sans-serif', 'system-ui'],
          'serif': ['ui-serif', 'Georgia'],
          'mono': ['ui-monospace', 'SFMono-Regular'],
        },
        // You can also extend other theme values like `fontSize`, `borderRadius`, etc.
      },
    },
    plugins: [
      // Add Tailwind plugins here
    ],
  }
  