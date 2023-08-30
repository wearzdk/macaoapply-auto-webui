import { defineConfig, presetAttributify, presetUno } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [
    presetAttributify({ /* preset options */}),
    presetUno(),
    // ...custom presets
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    color: {
      brand: '#5657F5',
      primary: '#5657F5',
      secondary: '#A7B1F5',

    },
  },
  shortcuts: {
    'warp': 'whitespace-pre-line break-words',
    'no-warp': 'overflow-hidden whitespace-nowrap text-ellipsis',
  },
})
