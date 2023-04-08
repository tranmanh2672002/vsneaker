import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "admin" | "auth" | "default"
declare module "C:/vueJs/VSneaker/vsneaker/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}