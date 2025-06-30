import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../shared/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Healthify Primary Brand Colors
        primary: {
          50: '#F3E8FF',
          100: '#E9D5FF', 
          200: '#D6BBFF',
          300: '#C084FC',
          400: '#B575A1',
          500: '#9D5A8F', // Main Healthify brand color
          600: '#7A4970', // Provider primary
          700: '#6B3B5E',
          800: '#5C324C',
          900: '#4D293A',
        },

        // Supporting Colors
        secondary: {
          50: '#E0F2FE',
          100: '#BAE6FD',
          200: '#7DD3FC',
          300: '#38BDF8',
          400: '#4A90A4',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },

        // Health Status Colors
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#6EBF7F',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },

        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#F4B942',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },

        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#E74C3C',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },

        accent: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#F39C9C',
          500: '#FB7185',
          600: '#F43F5E',
          700: '#E11D48',
          800: '#BE123C',
          900: '#9F1239',
        },

        // Provider-specific colors (professional, clinical)
        provider: {
          primary: '#7A4970',
          clinical: '#334155', // Gray-700 for clinical data
          urgent: '#E74C3C',
          professional: '#475569', // Gray-600 for professional contexts
        },

        // Clinical severity colors
        severity: {
          critical: '#E74C3C',
          high: '#F4B942',
          medium: '#FCD34D',
          low: '#10B981',
          info: '#0EA5E9',
        },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },

      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
        '5xl': '48px',
      },

      lineHeight: {
        tight: '1.25',
        normal: '1.4',
        relaxed: '1.6',
        loose: '1.8',
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem', // For wide desktop layouts
        '160': '40rem',
      },

      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },

      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'large': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'clinical': '0 2px 8px 0 rgba(0, 0, 0, 0.08)', // Subtle shadow for clinical data cards
      },

      zIndex: {
        'modal': '1000',
        'popover': '1010',
        'tooltip': '1020',
        'notification': '1030',
        'sidebar': '100',
      },

      // Provider-specific utilities
      minHeight: {
        'touch': '44px',
        'table-row': '48px', // Minimum height for data table rows
      },
      minWidth: {
        'touch': '44px',
        'sidebar': '240px', // Minimum sidebar width
      },

      animation: {
        'fade-in': 'fadeIn 0.15s ease-in',
        'slide-right': 'slideRight 0.25s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },

      // Custom grid layouts for provider interface
      gridTemplateColumns: {
        'provider-layout': '240px 1fr', // Sidebar + main content
        'consultation': '1fr 360px', // Video + patient data
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

export default config; 