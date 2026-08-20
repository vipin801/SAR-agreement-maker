export default {
  darkMode: 'class',
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        // Incentiv warm neutral base — theme-reactive via CSS custom properties
        canvas: 'rgb(var(--color-canvas) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        card: 'rgb(var(--color-card) / <alpha-value>)',
        line: {
          DEFAULT: 'rgb(var(--color-line) / <alpha-value>)',
          strong: 'rgb(var(--color-line-strong) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--color-ink) / <alpha-value>)',
          muted: 'rgb(var(--color-ink-muted) / <alpha-value>)',
          subtle: 'rgb(var(--color-ink-subtle) / <alpha-value>)',
        },
        // Single chromatic brand accent — constant across both themes
        accent: {
          DEFAULT: '#3482FF',
          hover: '#006EFF',
        },
        // Semantic green for positive / completed states
        success: {
          DEFAULT: '#22C55E',
          deep: 'rgb(var(--color-success-deep) / <alpha-value>)',
        },
        // Gradient endpoint — high-impact display moments only
        terracotta: '#D4715D',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"DM Serif Display"', 'Georgia', '"Times New Roman"', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', '"SF Mono"', 'Menlo', 'monospace'],
      },
      boxShadow: {
        panel: '0 1px 2px rgba(26,26,26,0.04), 0 4px 16px -8px rgba(26,26,26,0.10)',
        doc: '0 1px 2px rgba(26,26,26,0.04), 0 4px 16px rgba(26,26,26,0.08)',
      },
      borderRadius: {
        DEFAULT: '4px',
      },
    },
  },
  plugins: [],
};
