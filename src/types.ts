// import { type ViteSSGContext } from 'vite-ssg'

import type { App } from 'vue'
import type { Router } from 'vue-router'

interface CommonCtx {
  app: App<Element>
  router: Router
}

export type UserModule = (ctx: CommonCtx) => void
