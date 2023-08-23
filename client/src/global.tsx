import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    /* Indigo */
    --color-brand-50: #DFEBFC;
    --color-brand-100: #B0CEF8;
    --color-brand-200: #71A7F3;
    --color-brand-500: #438AEE;
    --color-brand-600: #156DE9;
    --color-brand-700: #125ECA;
    --color-brand-800: #0C418C;
    --color-brand-900: #051D3E;

    --border-radius-tiny: 3px;
    --border-radius-sm: 6px;
    --border-radius-md: 12px;
    --border-radius-lg: 24px;

    &, &.light-mode {
      --color-black-0: #fff;
      --color-black-50: #f9fafb;
      --color-black-100: #f3f4f6;
      --color-black-200: #e5e7eb;
      --color-black-300: #d1d5db;
      --color-black-400: #9ca3af;
      --color-black-500: #6b7280;
      --color-black-600: #4b5563;
      --color-black-700: #374151;
      --color-black-800: #1f2937;
      --color-black-900: #111827;

      --color-blue-100: #e0f2fe;
      --color-blue-700: #0369a1;
      --color-green-100: #dcfce7;
      --color-green-700: #15803d;
      --color-yellow-100: #fef9c3;
      --color-yellow-700: #a16207;
      --color-silver-100: #e5e7eb;
      --color-silver-700: #374151;
      --color-indigo-100: #e0e7ff;
      --color-indigo-700: #4338ca;

      --color-red-100: #fee2e2;
      --color-red-700: #b91c1c;
      --color-red-800: #991b1b;

      --backdrop-color: rgba(255, 255, 255, 0.1);

      --shadow: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
      --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
      --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

      --image-grayscale: 0;
      --image-opacity: 100%;
    }

    &.dark-mode {
      --color-black-0: #000000;
      --color-black-50: #050505;
      --color-black-100: #080808;
      --color-black-200: #181818;
      --color-black-300: #282828;
      --color-black-400: #383838;
      --color-black-500: #484848;
      --color-black-600: #585858;
      --color-black-700: #686868;
      --color-black-800: #787878;
      --color-black-900: #888888;

      --color-blue-100: #075985;
      --color-blue-700: #e0f2fe;
      --color-green-100: #166534;
      --color-green-700: #dcfce7;
      --color-yellow-100: #854d0e;
      --color-yellow-700: #fef9c3;
      --color-silver-100: #374151;
      --color-silver-700: #f3f4f6;
      --color-indigo-100: #3730a3;
      --color-indigo-700: #e0e7ff;

      --color-red-100: #fee2e2;
      --color-red-700: #b91c1c;
      --color-red-800: #991b1b;

      --backdrop-color: rgba(0, 0, 0, 0.3);

      --shadow: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
      --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
      --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

      --image-grayscale: 10%;
      --image-opacity: 90%;
    }
  }

  *, 
  *::before, 
  *::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: currentColor;

    padding: 0;
    margin: 0;

    transition-duration: 300ms;
    transition-property: background-color, border-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  html {
    -webkit-text-size-adjust: 100%;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
    font-size: 62.5%;
    line-height: 1.5;
    tab-size: 4;
    scroll-behavior: smooth;
  }

  body {
    color: var(--color-black-800);
    font-family: inherit;
    font-size: 1.6rem;
    line-height: inherit;
    margin: 0;
    min-height: 100vh;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  *:disabled {
    cursor: not-allowed;
  }

  select:disabled,
  input:disabled {
    background-color: var(--color-black-200);
    color: var(--color-black-500);
  }

  input:focus,
  button:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
  }

  /* Parent selector, finally 😃 */
  a:has(svg),
  button:has(svg) {
    line-height: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  svg {
    display: block;
    vertical-align: middle;
    shape-rendering: auto;
    text-rendering: optimizeLegibility;
  }

  pre {
    background-color: rgba(55, 65, 81, 1);
    border-radius: 0.25rem;
    color: rgba(229, 231, 235, 1);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
    overflow: scroll;
    padding: 0.5rem 0.75rem;
  }

  ul {
    list-style: none;
  }

  h1,
  h2,
  p,
  pre {
    margin: 0;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
    hyphens: auto;
  }

  img {
    max-width: 100%;
    
    /* For dark mode */
    filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
  }


    /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: var(--color-black-50);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: var(--color-brand-600);
    border-radius: var(--border-radius-lg);

  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-brand-700);
  }
`

export default GlobalStyles
