import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'uno.css'
import '@unocss/reset/tailwind-compat.css'
import type { UserModule } from './types'

const app = createApp(App)

app.use(router)

// 装载modules
// install all modules under `modules/`
Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
  .forEach(i => i.install?.({ app, router }))

router.isReady().then(() => {
  app.mount('#app')
})
