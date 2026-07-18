import {
  defineConfig,
  presetAttributify,
  presetUno,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
  ],
  preflights: [
    {
      getCSS: () => `
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #f5f7fa;
          color: #333;
        }
        * {
          box-sizing: border-box;
        }
      `,
    },
  ],
  rules: [
    // You can add custom rules here if needed
  ],
  shortcuts: {
    'app-container': 'flex flex-col min-h-100vh',
    'navbar': 'flex justify-between items-center bg-white px-8 h-60px shadow-[0_2px_8px_rgba(0,0,0,0.1)] sticky top-0 z-100',
    'nav-link': 'no-underline text-#666 font-500 p-2 transition-colors duration-200 hover:text-#42b983',
    'main-content': 'flex-1 p-8 max-w-1200px mx-auto w-full',
    'learn-container': 'flex gap-8 h-[calc(100vh-120px)]',
    'column': 'flex-1 bg-white rd-12px p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex flex-col',
    'list-item': 'p-4 mb-2 rd-8px bg-#f8f9fa cursor-pointer text-1.1rem transition-all duration-200 hover:bg-#e9ecef',
    'list-item-active': 'bg-#42b983! text-white! font-bold scale-102 shadow-[0_2px_8px_rgba(66,185,131,0.4)]',
    'vocab-item-active': 'bg-#e74c3c! text-white! font-bold scale-102 shadow-[0_2px_8px_rgba(231,76,60,0.4)]',
    'details-card': 'flex-1 flex flex-col items-center justify-center text-center',
    'status-container': 'bg-white rd-12px p-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)] min-h-400px',
    'stats-cards': 'grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8',
    'stat-card': 'bg-#f8f9fa rd-12px p-8 text-center transition-transform duration-200 hover:-translate-y-1.25 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)]',
  }
})
