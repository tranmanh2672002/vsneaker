import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "auth"
declare module "C:/vueJs/Khai_project/VSneaker/vsneaker/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}