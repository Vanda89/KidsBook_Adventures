import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/UI/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        jua: ['--Jua', 'sans-serif'],
        nunito: ['--Nunito', 'sans-serif'],
      },

      height: {
        0.5: '0.125rem',
        0.6: '0.15rem',
        0.65: '0.175rem',
        0.75: '0.1875rem',
        13: '3.25rem',
      },
      fontSize: {
        xxs: '0.4rem',
      },
      borderWidth: {
        2.5: '2.5px',
      },
      screens: {
        xxs: '360px',
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      backgroundImage: {
        neutralTheme: "url('/assets/images/backgrounds/neutral_bg.png')",
        violetTheme: "url('/assets/images/backgrounds/violet_bg.png')",
        pinkTheme: "url('/assets/images/backgrounds/pink_bg.png')",
        blueTheme: "url('/assets/images/backgrounds/blue_bg.png')",
        greenTheme: "url('/assets/images/backgrounds/green_bg.png')",
        yellowTheme: "url('/assets/images/backgrounds/yellow_bg.png')",
        orangeTheme: "url('/assets/images/backgrounds/orange_bg.png')",
        redTheme: "url('/assets/images/backgrounds/red_bg.png')",
        brownTheme: "url('/assets/images/backgrounds/brown_bg.png')",
        grayTheme: "url('/assets/images/backgrounds/gray_bg.png')",
      },
      textShadow: {
        outline: '2px 2px 0px rgba(0, 0, 0, 1)',
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        neutralTheme: {
          colors: {
            // Teal
            primary: {
              100: '#ccfbf1',
              200: '#99f6e4',
              300: '#5eead4',
              400: '#2dd4bf',
              500: '#14b8a6',
              600: '#0d9488',
              700: '#0f766e',
              800: '#115e59',
              900: '#134e4a',
            },
            // White
            background: '#f5f5f4',
            // Neutral
            secondary: {
              50: '#fafafa',
              100: '#f5f5f4',
              200: '#e5e5e5',
              300: '#d4d4d4',
              400: '#a3a3a3',
              500: '#737373',
              700: '#404040',
            },
            content1: '#000',
            content3: '#FFF',

            // Gray 200
            focus: '#e5e7eb',
          },
        },

        violetTheme: {
          colors: {
            // Fuchsia
            primary: {
              50: '#fdf4ff',
              100: '#fae8ff',
              200: '#f5d0fe',
              300: '#f0abfc',
              400: '#e879f9',
              500: '#d946ef',
              600: '#c026d3',
              700: '#a21caf',
              800: '#86198f',
              900: '#701a75',
            },
            // Violet
            secondary: {
              50: '#f5f3ff',
              100: '#ede9fe',
              200: '#ddd6fe',
              300: '#c4b5fd',
              400: '#a78bfa',
              500: '#8b5cf6',
              600: '#7c3aed',
              700: '#6d28d9',
              800: '#5b21b6',
              900: '#4c1d95',
            },
            // Violet 900
            background: '#a21caf',
            content1: '#FFF',
            content2: '#5b21b6',
            content3: '#000',
            // Fuchsia 500
            focus: '#d946ef',
          },
        },

        pinkTheme: {
          colors: {
            // Fuchsia
            primary: {
              50: '#fdf4ff',
              100: '#fae8ff',
              200: '#f5d0fe',
              300: '#f0abfc',
              400: '#e879f9',
              500: '#d946ef',
              600: '#c026d3',
              700: '#a21caf',
              800: '#86198f',
              900: '#701a75',
            },
            // Violet
            secondary: {
              50: '#f5f3ff',
              100: '#ede9fe',
              200: '#ddd6fe',
              300: '#c4b5fd',
              400: '#a78bfa',
              500: '#8b5cf6',
              600: '#7c3aed',
              700: '#6d28d9',
              800: '#5b21b6',
              900: '#4c1d95',
            },
            // Violet 900
            background: '#a21caf',
            content1: '#FFF',
            content2: '#5b21b6',
            content3: '#000',
            // Fuchsia 500
            focus: '#d946ef',
          },
        },

        blueTheme: {
          colors: {
            // Fuchsia
            primary: {
              50: '#fdf4ff',
              100: '#fae8ff',
              200: '#f5d0fe',
              300: '#f0abfc',
              400: '#e879f9',
              500: '#d946ef',
              600: '#c026d3',
              700: '#a21caf',
              800: '#86198f',
              900: '#701a75',
            },
            // Violet
            secondary: {
              50: '#f5f3ff',
              100: '#ede9fe',
              200: '#ddd6fe',
              300: '#c4b5fd',
              400: '#a78bfa',
              500: '#8b5cf6',
              600: '#7c3aed',
              700: '#6d28d9',
              800: '#5b21b6',
              900: '#4c1d95',
            },
            // Violet 900
            background: '#a21caf',
            content1: '#FFF',
            content2: '#5b21b6',
            content3: '#000',
            // Fuchsia 500
            focus: '#d946ef',
          },
        },

        greenTheme: {
          colors: {
            // Fuchsia
            primary: {
              50: '#fdf4ff',
              100: '#fae8ff',
              200: '#f5d0fe',
              300: '#f0abfc',
              400: '#e879f9',
              500: '#d946ef',
              600: '#c026d3',
              700: '#a21caf',
              800: '#86198f',
              900: '#701a75',
            },
            // Violet
            secondary: {
              50: '#f5f3ff',
              100: '#ede9fe',
              200: '#ddd6fe',
              300: '#c4b5fd',
              400: '#a78bfa',
              500: '#8b5cf6',
              600: '#7c3aed',
              700: '#6d28d9',
              800: '#5b21b6',
              900: '#4c1d95',
            },
            // Violet 900
            background: '#a21caf',
            content1: '#FFF',
            content2: '#5b21b6',
            content3: '#000',
            // Fuchsia 500
            focus: '#d946ef',
          },
        },

        yellowTheme: {
          colors: {
            // Fuchsia
            primary: {
              50: '#fdf4ff',
              100: '#fae8ff',
              200: '#f5d0fe',
              300: '#f0abfc',
              400: '#e879f9',
              500: '#d946ef',
              600: '#c026d3',
              700: '#a21caf',
              800: '#86198f',
              900: '#701a75',
            },
            // Violet
            secondary: {
              50: '#f5f3ff',
              100: '#ede9fe',
              200: '#ddd6fe',
              300: '#c4b5fd',
              400: '#a78bfa',
              500: '#8b5cf6',
              600: '#7c3aed',
              700: '#6d28d9',
              800: '#5b21b6',
              900: '#4c1d95',
            },
            // Violet 900
            background: '#a21caf',
            content1: '#FFF',
            content2: '#5b21b6',
            content3: '#000',
            // Fuchsia 500
            focus: '#d946ef',
          },
        },

        orangeTheme: {
          colors: {
            // Fuchsia
            primary: {
              50: '#fdf4ff',
              100: '#fae8ff',
              200: '#f5d0fe',
              300: '#f0abfc',
              400: '#e879f9',
              500: '#d946ef',
              600: '#c026d3',
              700: '#a21caf',
              800: '#86198f',
              900: '#701a75',
            },
            // Violet
            secondary: {
              50: '#f5f3ff',
              100: '#ede9fe',
              200: '#ddd6fe',
              300: '#c4b5fd',
              400: '#a78bfa',
              500: '#8b5cf6',
              600: '#7c3aed',
              700: '#6d28d9',
              800: '#5b21b6',
              900: '#4c1d95',
            },
            // Violet 900
            background: '#a21caf',
            content1: '#FFF',
            content2: '#5b21b6',
            content3: '#000',
            // Fuchsia 500
            focus: '#d946ef',
          },
        },

        redTheme: {
          colors: {
            // Fuchsia
            primary: {
              50: '#fdf4ff',
              100: '#fae8ff',
              200: '#f5d0fe',
              300: '#f0abfc',
              400: '#e879f9',
              500: '#d946ef',
              600: '#c026d3',
              700: '#a21caf',
              800: '#86198f',
              900: '#701a75',
            },
            // Violet
            secondary: {
              50: '#f5f3ff',
              100: '#ede9fe',
              200: '#ddd6fe',
              300: '#c4b5fd',
              400: '#a78bfa',
              500: '#8b5cf6',
              600: '#7c3aed',
              700: '#6d28d9',
              800: '#5b21b6',
              900: '#4c1d95',
            },
            // Violet 900
            background: '#a21caf',
            content1: '#FFF',
            content2: '#5b21b6',
            content3: '#000',
            // Fuchsia 500
            focus: '#d946ef',
          },
        },

        brownTheme: {
          colors: {
            // Fuchsia
            primary: {
              50: '#fdf4ff',
              100: '#fae8ff',
              200: '#f5d0fe',
              300: '#f0abfc',
              400: '#e879f9',
              500: '#d946ef',
              600: '#c026d3',
              700: '#a21caf',
              800: '#86198f',
              900: '#701a75',
            },
            // Violet
            secondary: {
              50: '#f5f3ff',
              100: '#ede9fe',
              200: '#ddd6fe',
              300: '#c4b5fd',
              400: '#a78bfa',
              500: '#8b5cf6',
              600: '#7c3aed',
              700: '#6d28d9',
              800: '#5b21b6',
              900: '#4c1d95',
            },
            // Violet 900
            background: '#a21caf',
            content1: '#FFF',
            content2: '#5b21b6',
            content3: '#000',
            // Fuchsia 500
            focus: '#d946ef',
          },
        },

        grayTheme: {
          colors: {
            // Fuchsia
            primary: {
              50: '#fdf4ff',
              100: '#fae8ff',
              200: '#f5d0fe',
              300: '#f0abfc',
              400: '#e879f9',
              500: '#d946ef',
              600: '#c026d3',
              700: '#a21caf',
              800: '#86198f',
              900: '#701a75',
            },
            // Violet
            secondary: {
              50: '#f5f3ff',
              100: '#ede9fe',
              200: '#ddd6fe',
              300: '#c4b5fd',
              400: '#a78bfa',
              500: '#8b5cf6',
              600: '#7c3aed',
              700: '#6d28d9',
              800: '#5b21b6',
              900: '#4c1d95',
            },
            // Violet 900
            background: '#a21caf',
            content1: '#FFF',
            content2: '#5b21b6',
            content3: '#000',
            // Fuchsia 500
            focus: '#d946ef',
          },
        },
      },
    }),
  ],
};
export default config;
