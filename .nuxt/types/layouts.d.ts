import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "admin" | "auth" | "default" | "payment"
declare module "D:/Workspace/Nuxt/vsneaker/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}